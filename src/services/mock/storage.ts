/**
 * Camada de abstração para localStorage
 * Simula um banco de dados local com tipagem TypeScript
 */

const STORAGE_VERSION = '1.0';
const STORAGE_PREFIX = 'wepgcomp_';

export class MockStorage {
  /**
   * Obtém um item do localStorage com tipagem
   */
  static get<T>(key: string): T | null {
    try {
      const fullKey = STORAGE_PREFIX + key;
      const item = localStorage.getItem(fullKey);

      if (!item) {
        return null;
      }

      const parsed = JSON.parse(item);

      // Verifica versão para migração futura se necessário
      if (parsed._version !== STORAGE_VERSION) {
        console.warn(`Storage version mismatch for key ${key}`);
      }

      return parsed.data as T;
    } catch (error) {
      console.error(`Error reading from storage: ${key}`, error);
      return null;
    }
  }

  /**
   * Salva um item no localStorage
   */
  static set<T>(key: string, value: T): void {
    try {
      const fullKey = STORAGE_PREFIX + key;
      const item = {
        _version: STORAGE_VERSION,
        _timestamp: new Date().toISOString(),
        data: value,
      };

      localStorage.setItem(fullKey, JSON.stringify(item));
    } catch (error) {
      console.error(`Error writing to storage: ${key}`, error);

      // Se der erro de quota, limpa dados antigos
      if (error instanceof DOMException && error.name === 'QuotaExceededError') {
        console.warn('Storage quota exceeded, clearing old data...');
        this.clearOldData();

        // Tenta novamente
        try {
          const fullKey = STORAGE_PREFIX + key;
          localStorage.setItem(fullKey, JSON.stringify({
            _version: STORAGE_VERSION,
            _timestamp: new Date().toISOString(),
            data: value,
          }));
        } catch (retryError) {
          console.error('Failed to save even after clearing old data', retryError);
        }
      }
    }
  }

  /**
   * Remove um item do localStorage
   */
  static remove(key: string): void {
    try {
      const fullKey = STORAGE_PREFIX + key;
      localStorage.removeItem(fullKey);
    } catch (error) {
      console.error(`Error removing from storage: ${key}`, error);
    }
  }

  /**
   * Limpa todos os dados do aplicativo
   */
  static clear(): void {
    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith(STORAGE_PREFIX)) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.error('Error clearing storage', error);
    }
  }

  /**
   * Limpa dados antigos (mais de 30 dias)
   */
  private static clearOldData(): void {
    try {
      const keys = Object.keys(localStorage);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      keys.forEach(key => {
        if (key.startsWith(STORAGE_PREFIX)) {
          try {
            const item = localStorage.getItem(key);
            if (item) {
              const parsed = JSON.parse(item);
              const timestamp = new Date(parsed._timestamp);

              if (timestamp < thirtyDaysAgo) {
                localStorage.removeItem(key);
                console.log(`Removed old data: ${key}`);
              }
            }
          } catch (e) {
            // Se der erro ao parsear, remove o item corrompido
            localStorage.removeItem(key);
          }
        }
      });
    } catch (error) {
      console.error('Error clearing old data', error);
    }
  }

  /**
   * Exporta todos os dados para backup
   */
  static exportData(): string {
    const data: Record<string, unknown> = {};
    const keys = Object.keys(localStorage);

    keys.forEach(key => {
      if (key.startsWith(STORAGE_PREFIX)) {
        const shortKey = key.replace(STORAGE_PREFIX, '');
        data[shortKey] = this.get(shortKey);
      }
    });

    return JSON.stringify(data, null, 2);
  }

  /**
   * Importa dados de backup
   */
  static importData(jsonData: string): void {
    try {
      const data = JSON.parse(jsonData);

      Object.keys(data).forEach(key => {
        this.set(key, data[key]);
      });

      console.log('Data imported successfully');
    } catch (error) {
      console.error('Error importing data', error);
      throw new Error('Invalid data format');
    }
  }

  /**
   * Verifica se uma chave existe
   */
  static has(key: string): boolean {
    return this.get(key) !== null;
  }

  /**
   * Lista todas as chaves armazenadas
   */
  static keys(): string[] {
    const keys = Object.keys(localStorage);
    return keys
      .filter(key => key.startsWith(STORAGE_PREFIX))
      .map(key => key.replace(STORAGE_PREFIX, ''));
  }
}

export default MockStorage;
