import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { OnModuleInit, UseGuards, Logger } from '@nestjs/common';
import { WsJwtGuard } from '@/modules/auth/guards/ws-jwt.guard';

@WebSocketGateway({
  cors: true,
  namespace: 'posts'
})
@UseGuards(WsJwtGuard)
export class PostsGateway implements OnModuleInit {
  private readonly logger = new Logger(PostsGateway.name);
  
  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.logger.log('WebSocket Gateway initialized');
  }

  handleConnection(client: Socket) {
    console.log('Client connected:', client.id);
    try {
      const userId = client.handshake.auth.userId;
      if (userId) {
        const userChannel = `user_${userId}`;
        client.join(userChannel);
        console.log('========================');
        console.log(`Subscribed to User Channel: ${userChannel}`);
        console.log('User ID:', userId);
        console.log('Socket ID:', client.id);
        console.log('========================');
      }
    } catch (error) {
      this.logger.error('Connection error:', error);
    }
  }

  handleDisconnect(client: Socket) {
    const userId = client.handshake.auth.userId;
    if (userId) {
      const userChannel = `user_${userId}`;
      client.leave(userChannel);
      console.log('========================');
      console.log('❌ Client Disconnected:');
    }
  }

  handlePostUpdated(postData: any) {
    try {
      console.log('========================');
      console.log('📝 Post Update Event Triggered:');

      if (!postData?.id || !postData?.userId) {
        console.log('❌ Invalid post data: missing ID or userId');
        return;
      }

      const postChannel = `post_${postData.id}`;
      const eventName = 'POST_UPDATED';

      if (!this.server) {
        console.log('❌ WebSocket server not initialized');
        return;
      }

      const eventPayload = {
        event: eventName,
        postId: postData.id,
        userId: postData.userId,
        data: postData.data,
        timestamp: new Date().toISOString()
      };

      // Emit to all subscribers of the post channel
      this.server.emit(postChannel, eventPayload);
      // this.server.to(postChannel).emit(eventName, eventPayload);

      console.log('after to(postChannel).emit(eventName, eventPayload)');
    } catch (error) {
      console.log('❌ Error broadcasting update event:', error);
      this.logger.error('Error emitting post update:', error);
    }
  }

  handlePostDeleted(postData: any) {
    try {
      console.log('========================');
      console.log('📝 Post Delete Event Triggered:');
      if (!postData?.id || !postData?.userId) {
        console.log('❌ Invalid post data: missing ID or userId');
        return;
      }

      const userChannel = `user_${postData.userId}`;
      const eventName = 'POST_DELETED';

      if (!this.server) {
        console.log('❌ WebSocket server not initialized');
        return;
      }

      const eventPayload = {
        event: eventName,
        postId: postData.id,
        userId: postData.userId,
        data: postData.data,
        timestamp: new Date().toISOString()
      };

      console.log(`Broadcasting delete event to user channel: ${userChannel}`);
      this.server.emit(userChannel, eventPayload);
      // this.server.to(userChannel).emit(eventName, eventPayload);
    } catch (error) {
      console.log('❌ Error broadcasting delete event:', error);
      this.logger.error('Error emitting post deletion:', error);
    }
  }

  @SubscribeMessage('subscribeToPost')
  handlePostSubscription(
    @ConnectedSocket() client: Socket, 
    @MessageBody() postId: string
  ) {
    try {
      const postChannel = `post_${postId}`;
      client.join(postChannel);
      
      console.log('========================');
      console.log(`Client ${client.id} subscribed to post channel: ${postChannel}`);
      console.log('========================');

      return {
        event: 'SUBSCRIBED_TO_POST',
        data: {
          postId,
          channel: postChannel,
          timestamp: new Date().toISOString()
        }
      };
    } catch (error) {
      this.logger.error(`Error subscribing to post ${postId}:`, error);
      throw error;
    }
  }

  @SubscribeMessage('unsubscribeFromPost')
  handlePostUnsubscription(
    @ConnectedSocket() client: Socket, 
    @MessageBody() postId: string
  ) {
    try {
      const postChannel = `post_${postId}`;
      client.leave(postChannel);
      
      console.log('========================');
      console.log(`Client ${client.id} unsubscribed from post channel: ${postChannel}`);
      console.log('========================');

      return {
        event: 'UNSUBSCRIBED_FROM_POST',
        data: {
          postId,
          channel: postChannel,
          timestamp: new Date().toISOString()
        }
      };
    } catch (error) {
      this.logger.error(`Error unsubscribing from post ${postId}:`, error);
      throw error;
    }
  }

}