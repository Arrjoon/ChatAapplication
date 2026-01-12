export interface MessageItemProps {
  message: {
    id: string | number;
    message?: string;
    message_type?: string;
    direction?:"incoming"|"outgoing"
    created_at?: string | Date;
    sender_id?:string |number;
    author_name?: string;
    replied_by_ai?: boolean;
    ai_reply: boolean;
    attachments?: Array<{
      id?: string | number;
      file_url?: string;
      original_filename?: string;
      extension?: string;
      file_type?: string;
      file_size?: number;
      is_voice_message?: boolean;
      display_name?: string;
    }>;
  };
  openImagePreview: (url: string) => void;
}
