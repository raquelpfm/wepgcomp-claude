/**
 * Central exports for all services
 * Services are automatically switched between real API and mock based on VITE_USE_MOCK_DATA
 */

export { default as api, handleApiError } from './api';

// Export services from config (automatically switches between real and mock)
export {
  authService,
  userService,
  eventService,
  presentationService,
  certificateService,
  serviceModeInfo,
} from '../config/services.config';
