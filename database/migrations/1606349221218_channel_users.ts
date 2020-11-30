import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ChannelUsers extends BaseSchema {
  protected tableName = 'channel_users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()
      table.string('slack_oauth_token_id').references('id').inTable('slack_oauth_tokens')
      table.string('slack_id')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
