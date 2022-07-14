<template>
    <ChatWindow 
        :rooms="rooms"
        :messages="messages"
        :current-user-id="currentUserId"
        :single-room="true"
        height="100%"
        @fetch-messages="fetchMessages"
        @send-message="sendMessage"
        @edit-message="editMessage"
        @delete-message="deleteMessage"
        @open-file="openFile"
        @open-user-tag="openUserTag"
        @add-room="addRoom"
        @room-action-handler="menuActionHandler"
        @menu-action-handler="menuActionHandler"
        @message-selection-action-handler="messageSelectionActionHandler"
        @send-message-reaction="sendMessageReaction"
        @typing-message="typingMessage"
    >
    </ChatWindow>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ChatWindow from "vue-advanced-chat";
import "vue-advanced-chat/dist/vue-advanced-chat.css";

@Options({
    components: {
        ChatWindow,
    },
})
export default class ChatComponent extends Vue {
    rooms = [{
        roomId: 1,
        roomName: "Chat chat chatty chat",
        users: [
            {
                _id: 1234,
                username: 'John Doe',
                status: {
                    state: 'online',
                    lastChanged: 'today, 14:30'
                }
            },
            {
                _id: 4321,
                username: 'John Snow',
                status: {
                    state: 'offline',
                    lastChanged: '14 July, 20:00'
                }
            }
        ],
    }];
    messages = [];
    currentUserId = 1234;

    fetchMessages(params: {room: any, options?: any}): void {
        // TODO fetch messages and add to messages
    }

    
}
</script>

<style scoped>

</style>