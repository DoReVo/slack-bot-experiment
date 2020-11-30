import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class SlackApp extends BaseSchema {
  protected tableName = 'slack_apps'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()
      table.string('client_id')
      table.string('client_secret')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
