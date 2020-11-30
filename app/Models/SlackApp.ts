import { BaseModel, beforeCreate, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import { nanoid } from 'nanoid'
import SlackOauthToken from './SlackOauthToken'

export default class SlackApp extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public clientId: string

  @column()
  public clientSecret: string

  @hasOne(() => SlackOauthToken)
  public oAuthToken: HasOne<typeof SlackOauthToken>

  // Create id
  @beforeCreate()
  public static async createId(app: SlackApp) {
    app.id = nanoid()
  }
}
