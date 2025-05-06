import pino from 'pino'

// Create a Pino logger instance
const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'SYS:standard',
    },
  },
})

// Log levels
export const LogLevel = {
  DEBUG: 'debug',
  INFO: 'info',
  WARN: 'warn',
  ERROR: 'error',
} as const

// Log categories
export const LogCategory = {
  USER: 'user',
  SYSTEM: 'system',
  SECURITY: 'security',
  AUDIT: 'audit',
} as const

// Log action types
export const LogAction = {
  CREATE: 'create',
  UPDATE: 'update',
  DELETE: 'delete',
  LOGIN: 'login',
  LOGOUT: 'logout',
  CONFIG_CHANGE: 'config_change',
} as const

// Base log structure
interface BaseLog {
  timestamp?: string
  category: keyof typeof LogCategory
  action: keyof typeof LogAction
  userId?: string
  details: Record<string, unknown>
}

// Create a structured log entry
export const createLog = (log: BaseLog) => {
  const logEntry = {
    ...log,
    timestamp: new Date().toISOString(),
  }

  // Log based on category
  switch (log.category) {
    case 'USER':
      logger.info(logEntry, 'User action')
      break
    case 'SYSTEM':
      logger.info(logEntry, 'System event')
      break
    case 'SECURITY':
      logger.warn(logEntry, 'Security event')
      break
    case 'AUDIT':
      logger.info(logEntry, 'Audit event')
      break
    default:
      logger.info(logEntry, 'General event')
  }

  return logEntry
}

// Helper functions for common log types
export const logUserAction = (
  action: keyof typeof LogAction,
  userId: string,
  details: Record<string, unknown>
) => {
  return createLog({
    category: 'USER',
    action,
    userId,
    details,
  })
}

export const logSystemEvent = (
  action: keyof typeof LogAction,
  details: Record<string, unknown>
) => {
  return createLog({
    category: 'SYSTEM',
    action,
    details,
  })
}

export const logSecurityEvent = (
  action: keyof typeof LogAction,
  userId: string,
  details: Record<string, unknown>
) => {
  return createLog({
    category: 'SECURITY',
    action,
    userId,
    details,
  })
}

export const logAuditEvent = (
  action: keyof typeof LogAction,
  userId: string,
  details: Record<string, unknown>
) => {
  return createLog({
    category: 'AUDIT',
    action,
    userId,
    details,
  })
}

export default logger 