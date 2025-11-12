/**
 * Mock Data Storage
 * Manages in-memory storage with localStorage persistence
 */

import {
  User,
  EventEdition,
  Session,
  Room,
  Presentation,
  PresentationVote,
  Certificate,
  Award,
} from '../../types';

import { mockUsers } from './data/users.data';
import { mockEventEditions, mockSessions, mockRooms } from './data/events.data';
import { mockPresentations, mockVotes } from './data/presentations.data';
import { mockCertificates, mockAwards } from './data/certificates.data';

// Storage keys
const STORAGE_KEYS = {
  USERS: 'wepgcomp_mock_users',
  EVENTS: 'wepgcomp_mock_events',
  SESSIONS: 'wepgcomp_mock_sessions',
  ROOMS: 'wepgcomp_mock_rooms',
  PRESENTATIONS: 'wepgcomp_mock_presentations',
  VOTES: 'wepgcomp_mock_votes',
  CERTIFICATES: 'wepgcomp_mock_certificates',
  AWARDS: 'wepgcomp_mock_awards',
  INITIALIZED: 'wepgcomp_mock_initialized',
};

/**
 * Mock Storage Manager
 * Provides CRUD operations on mock data with optional localStorage persistence
 */
class MockStorage {
  private users: User[] = [];
  private events: EventEdition[] = [];
  private sessions: Session[] = [];
  private rooms: Room[] = [];
  private presentations: Presentation[] = [];
  private votes: PresentationVote[] = [];
  private certificates: Certificate[] = [];
  private awards: Award[] = [];
  private usePersistence: boolean;

  constructor(usePersistence = false) {
    this.usePersistence = usePersistence;

    // Initialize from localStorage if available, otherwise use default mock data
    if (this.usePersistence && this.isInitialized()) {
      this.loadFromStorage();
    } else {
      this.users = [...mockUsers];
      this.events = [...mockEventEditions];
      this.sessions = [...mockSessions];
      this.rooms = [...mockRooms];
      this.presentations = [...mockPresentations];
      this.votes = [...mockVotes];
      this.certificates = [...mockCertificates];
      this.awards = [...mockAwards];

      if (this.usePersistence) {
        this.saveToStorage();
        this.markAsInitialized();
      }
    }
  }

  // Persistence helpers
  private isInitialized(): boolean {
    return localStorage.getItem(STORAGE_KEYS.INITIALIZED) === 'true';
  }

  private markAsInitialized(): void {
    localStorage.setItem(STORAGE_KEYS.INITIALIZED, 'true');
  }

  private loadFromStorage(): void {
    this.users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
    this.events = JSON.parse(localStorage.getItem(STORAGE_KEYS.EVENTS) || '[]');
    this.sessions = JSON.parse(localStorage.getItem(STORAGE_KEYS.SESSIONS) || '[]');
    this.rooms = JSON.parse(localStorage.getItem(STORAGE_KEYS.ROOMS) || '[]');
    this.presentations = JSON.parse(localStorage.getItem(STORAGE_KEYS.PRESENTATIONS) || '[]');
    this.votes = JSON.parse(localStorage.getItem(STORAGE_KEYS.VOTES) || '[]');
    this.certificates = JSON.parse(localStorage.getItem(STORAGE_KEYS.CERTIFICATES) || '[]');
    this.awards = JSON.parse(localStorage.getItem(STORAGE_KEYS.AWARDS) || '[]');
  }

  private saveToStorage(): void {
    if (!this.usePersistence) return;

    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(this.users));
    localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(this.events));
    localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(this.sessions));
    localStorage.setItem(STORAGE_KEYS.ROOMS, JSON.stringify(this.rooms));
    localStorage.setItem(STORAGE_KEYS.PRESENTATIONS, JSON.stringify(this.presentations));
    localStorage.setItem(STORAGE_KEYS.VOTES, JSON.stringify(this.votes));
    localStorage.setItem(STORAGE_KEYS.CERTIFICATES, JSON.stringify(this.certificates));
    localStorage.setItem(STORAGE_KEYS.AWARDS, JSON.stringify(this.awards));
  }

  // Reset to default data
  reset(): void {
    this.users = [...mockUsers];
    this.events = [...mockEventEditions];
    this.sessions = [...mockSessions];
    this.rooms = [...mockRooms];
    this.presentations = [...mockPresentations];
    this.votes = [...mockVotes];
    this.certificates = [...mockCertificates];
    this.awards = [...mockAwards];

    if (this.usePersistence) {
      this.saveToStorage();
    }
  }

  // User operations
  getUsers(): User[] {
    return [...this.users];
  }

  getUserById(id: string): User | undefined {
    return this.users.find((u) => u.id === id);
  }

  getUserByEmail(email: string): User | undefined {
    return this.users.find((u) => u.email === email);
  }

  updateUser(id: string, updates: Partial<User>): User | undefined {
    const index = this.users.findIndex((u) => u.id === id);
    if (index === -1) return undefined;

    this.users[index] = { ...this.users[index], ...updates };
    this.saveToStorage();
    return this.users[index];
  }

  addUser(user: User): User {
    this.users.push(user);
    this.saveToStorage();
    return user;
  }

  deleteUser(id: string): boolean {
    const index = this.users.findIndex((u) => u.id === id);
    if (index === -1) return false;

    this.users.splice(index, 1);
    this.saveToStorage();
    return true;
  }

  // Event operations
  getEvents(): EventEdition[] {
    return [...this.events];
  }

  getEventById(id: string): EventEdition | undefined {
    return this.events.find((e) => e.id === id);
  }

  getActiveEvent(): EventEdition | undefined {
    return this.events.find((e) => e.isActive);
  }

  updateEvent(id: string, updates: Partial<EventEdition>): EventEdition | undefined {
    const index = this.events.findIndex((e) => e.id === id);
    if (index === -1) return undefined;

    this.events[index] = { ...this.events[index], ...updates };
    this.saveToStorage();
    return this.events[index];
  }

  addEvent(event: EventEdition): EventEdition {
    this.events.push(event);
    this.saveToStorage();
    return event;
  }

  // Session operations
  getSessions(): Session[] {
    return [...this.sessions];
  }

  getSessionById(id: string): Session | undefined {
    return this.sessions.find((s) => s.id === id);
  }

  getSessionsByEventId(eventId: string): Session[] {
    return this.sessions.filter((s) => s.eventEditionId === eventId);
  }

  updateSession(id: string, updates: Partial<Session>): Session | undefined {
    const index = this.sessions.findIndex((s) => s.id === id);
    if (index === -1) return undefined;

    this.sessions[index] = { ...this.sessions[index], ...updates };
    this.saveToStorage();
    return this.sessions[index];
  }

  addSession(session: Session): Session {
    this.sessions.push(session);
    this.saveToStorage();
    return session;
  }

  deleteSession(id: string): boolean {
    const index = this.sessions.findIndex((s) => s.id === id);
    if (index === -1) return false;

    this.sessions.splice(index, 1);
    this.saveToStorage();
    return true;
  }

  // Room operations
  getRooms(): Room[] {
    return [...this.rooms];
  }

  getRoomById(id: string): Room | undefined {
    return this.rooms.find((r) => r.id === id);
  }

  updateRoom(id: string, updates: Partial<Room>): Room | undefined {
    const index = this.rooms.findIndex((r) => r.id === id);
    if (index === -1) return undefined;

    this.rooms[index] = { ...this.rooms[index], ...updates };
    this.saveToStorage();
    return this.rooms[index];
  }

  addRoom(room: Room): Room {
    this.rooms.push(room);
    this.saveToStorage();
    return room;
  }

  // Presentation operations
  getPresentations(): Presentation[] {
    return [...this.presentations];
  }

  getPresentationById(id: string): Presentation | undefined {
    return this.presentations.find((p) => p.id === id);
  }

  getPresentationsByEventId(eventId: string): Presentation[] {
    return this.presentations.filter((p) => p.eventEditionId === eventId);
  }

  getPresentationsByStudentId(studentId: string): Presentation[] {
    return this.presentations.filter((p) => p.studentId === studentId);
  }

  updatePresentation(id: string, updates: Partial<Presentation>): Presentation | undefined {
    const index = this.presentations.findIndex((p) => p.id === id);
    if (index === -1) return undefined;

    this.presentations[index] = { ...this.presentations[index], ...updates };
    this.saveToStorage();
    return this.presentations[index];
  }

  addPresentation(presentation: Presentation): Presentation {
    this.presentations.push(presentation);
    this.saveToStorage();
    return presentation;
  }

  deletePresentation(id: string): boolean {
    const index = this.presentations.findIndex((p) => p.id === id);
    if (index === -1) return false;

    this.presentations.splice(index, 1);
    this.saveToStorage();
    return true;
  }

  // Vote operations
  getVotes(): PresentationVote[] {
    return [...this.votes];
  }

  getVotesByPresentationId(presentationId: string): PresentationVote[] {
    return this.votes.filter((v) => v.presentationId === presentationId);
  }

  getVotesByUserId(userId: string): PresentationVote[] {
    return this.votes.filter((v) => v.userId === userId);
  }

  getUserVoteForPresentation(userId: string, presentationId: string): PresentationVote | undefined {
    return this.votes.find((v) => v.userId === userId && v.presentationId === presentationId);
  }

  addVote(vote: PresentationVote): PresentationVote {
    this.votes.push(vote);
    this.saveToStorage();
    return vote;
  }

  updateVote(id: string, updates: Partial<PresentationVote>): PresentationVote | undefined {
    const index = this.votes.findIndex((v) => v.id === id);
    if (index === -1) return undefined;

    this.votes[index] = { ...this.votes[index], ...updates };
    this.saveToStorage();
    return this.votes[index];
  }

  deleteVote(id: string): boolean {
    const index = this.votes.findIndex((v) => v.id === id);
    if (index === -1) return false;

    this.votes.splice(index, 1);
    this.saveToStorage();
    return true;
  }

  // Certificate operations
  getCertificates(): Certificate[] {
    return [...this.certificates];
  }

  getCertificateById(id: string): Certificate | undefined {
    return this.certificates.find((c) => c.id === id);
  }

  getCertificatesByEventId(eventId: string): Certificate[] {
    return this.certificates.filter((c) => c.eventEditionId === eventId);
  }

  getCertificatesByUserId(userId: string): Certificate[] {
    return this.certificates.filter((c) => c.userId === userId);
  }

  addCertificate(certificate: Certificate): Certificate {
    this.certificates.push(certificate);
    this.saveToStorage();
    return certificate;
  }

  // Award operations
  getAwards(): Award[] {
    return [...this.awards];
  }

  getAwardById(id: string): Award | undefined {
    return this.awards.find((a) => a.id === id);
  }

  getAwardsByEventId(eventId: string): Award[] {
    return this.awards.filter((a) => a.eventEditionId === eventId);
  }

  addAward(award: Award): Award {
    this.awards.push(award);
    this.saveToStorage();
    return award;
  }
}

// Singleton instance
let storageInstance: MockStorage | null = null;

export const getMockStorage = (usePersistence = false): MockStorage => {
  if (!storageInstance) {
    storageInstance = new MockStorage(usePersistence);
  }
  return storageInstance;
};

export const resetMockStorage = (): void => {
  if (storageInstance) {
    storageInstance.reset();
  }
};
