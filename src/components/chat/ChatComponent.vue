<template>
    <ChatWindow 
        :rooms="rooms"
        :messages="messages"
        :current-user-id="currentUserId"
        :single-room="true"
        height="100%"
        :theme="isDarkMode ? 'dark' : 'light'"
        @fetch-messages="fetchMessages"
        @send-message="sendMessage"
        @edit-message="editMessage"
        @delete-message="deleteMessage"
        @open-file="openFile"
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
import { useTheme } from "vuetify/lib/framework.mjs";

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

    theme!: any

    created() {
        this.theme = useTheme();
    }

    get isDarkMode(): boolean {
        return this.theme?.global?.name?.value == "dark";
    }

    fetchMessages(args: any): void {
        // TODO
    }

    sendMessage(args: any): void {
        // TODO 
    }

    editMessage(args: any): void {
        // TODO
    }

    deleteMessage(args: any): void {
        // TODO
    }
    
    openFile(args: any): void {
        // TODO
    }

    sendMessageReaction(args: any): void {
        // TODO
    }

    messageSelectionActionHandler(args: any): void {
        // TODO
    }
    typingMessage(args: any): void {
        // TODO
    }
}
</script>

<style scoped>

</style>