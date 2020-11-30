interface Webhook {
  token: string
  team_id: string
  api_app_id: string
  event: Event
  type: 'url_verification' | 'event_callback'
  event_id: string
  is_ext_shared_channel: boolean
  event_context: string
}

interface Event {
  client_msg_id: string
  type: 'app_mention' | 'message'
  text: string
  user: string
  ts: string
  team: string
  channel: string
  event_ts: string
  channel_type: string
}
