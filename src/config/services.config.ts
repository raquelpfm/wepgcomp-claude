/**
 * Services Configuration
 * Toggles between real API and mock services based on environment
 */

// Real services
import realAuthService from '../services/auth.service';
import realUserService from '../services/user.service';
import realEventService from '../services/event.service';
import realPresentationService from '../services/presentation.service';
import realCertificateService from '../services/certificate.service';

// Mock services
import {
  mockAuthService,
  mockUserService,
  mockEventService,
  mockPresentationService,
  mockCertificateService,
} from '../services/mock';

// Check environment variable
const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA === 'true';

// Log mode on startup
if (import.meta.env.DEV) {
  console.log(
    `🔧 Services Mode: ${USE_MOCK_DATA ? '🎭 MOCK DATA' : '🌐 REAL API'}`
  );
  if (USE_MOCK_DATA) {
    console.log('📝 Mock data is active. No backend required.');
    console.log('💡 To use real API, set VITE_USE_MOCK_DATA=false in .env');
  }
}

// Export the appropriate services based on environment
export const authService = USE_MOCK_DATA ? mockAuthService : realAuthService;
export const userService = USE_MOCK_DATA ? mockUserService : realUserService;
export const eventService = USE_MOCK_DATA ? mockEventService : realEventService;
export const presentationService = USE_MOCK_DATA
  ? mockPresentationService
  : realPresentationService;
export const certificateService = USE_MOCK_DATA
  ? mockCertificateService
  : realCertificateService;

// Export mode info
export const serviceModeInfo = {
  useMockData: USE_MOCK_DATA,
  apiUrl: import.meta.env.VITE_API_URL,
  mockPersistence: import.meta.env.VITE_MOCK_PERSISTENCE === 'true',
  mockDelay: parseInt(import.meta.env.VITE_MOCK_DELAY || '300', 10),
};
