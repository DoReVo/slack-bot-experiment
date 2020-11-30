import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class SlackOauthTokens extends BaseSchema {
  protected tableName = 'slack_oauth_tokens'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()
      table.string('slack_app_id').references('id').inTable('slack_apps')
      table.string('workspace_id')
      table.string('bot_user_id')
      table.string('token')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
