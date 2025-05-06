/**
 * Simple PubSub implementation for server-sent events
 * Used to broadcast subscription events to connected clients
 */

// Type for an event handler function
type EventHandler = (data: any) => void;

// Storage for event handlers by channel
const eventHandlers: Record<string, Set<EventHandler>> = {};
// Storage for pending events
const pendingEvents: Record<string, any[]> = {};

export class PubSub {
  /**
   * Subscribe to a channel
   * @param channel The channel to subscribe to
   * @param handler The handler to call when an event is published
   * @returns A function to unsubscribe
   */
  subscribe(channel: string, handler: EventHandler): () => void {
    if (!eventHandlers[channel]) {
      eventHandlers[channel] = new Set();
      pendingEvents[channel] = [];
    }
    
    eventHandlers[channel].add(handler);
    
    // Process any pending events for this handler
    if (pendingEvents[channel]?.length > 0) {
      for (const event of pendingEvents[channel]) {
        handler(event);
      }
      pendingEvents[channel] = [];
    }
    
    // Return unsubscribe function
    return () => {
      if (eventHandlers[channel]) {
        eventHandlers[channel].delete(handler);
        
        // Clean up if no more handlers
        if (eventHandlers[channel].size === 0) {
          delete eventHandlers[channel];
          delete pendingEvents[channel];
        }
      }
    };
  }
  
  /**
   * Publish an event to a channel
   * @param channel The channel to publish to
   * @param data The data to publish
   */
  async publish(channel: string, data: any): Promise<void> {
    // If no handlers, store the event for future subscribers
    if (!eventHandlers[channel] || eventHandlers[channel].size === 0) {
      if (!pendingEvents[channel]) {
        pendingEvents[channel] = [];
      }
      pendingEvents[channel].push(data);
      return;
    }
    
    // Call all handlers for this channel
    const handlers = Array.from(eventHandlers[channel]);
    for (const handler of handlers) {
      try {
        handler(data);
      } catch (error) {
        console.error(`Error in event handler for channel ${channel}:`, error);
      }
    }
  }
  
  /**
   * Get the number of subscribers for a channel
   * @param channel The channel to check
   * @returns The number of subscribers
   */
  subscriberCount(channel: string): number {
    return eventHandlers[channel]?.size || 0;
  }
  
  /**
   * Check if a channel has subscribers
   * @param channel The channel to check
   * @returns True if the channel has subscribers
   */
  hasSubscribers(channel: string): boolean {
    return Boolean(eventHandlers[channel]?.size);
  }
}

// Singleton instance
const pubsubInstance = new PubSub();
export default pubsubInstance;
