import {
  BaseModel,
  beforeCreate,
  BelongsTo,
  belongsTo,
  column,
  HasMany,
  hasMany,
} from '@ioc:Adonis/Lucid/Orm'
import { nanoid } from 'nanoid'
import ChannelUser from './ChannelUser'
import SlackApp from './SlackApp'

export default class SlackOauthToken extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public token: string

  @column()
  public slackAppId: string

  @column()
  public workspaceId: string

  @column()
  public botUserId: string

  @belongsTo(() => SlackApp)
  public slackApp: BelongsTo<typeof SlackApp>

  @hasMany(() => ChannelUser)
  public users: HasMany<typeof ChannelUser>
  // Create id
  @beforeCreate()
  public static async createId(token: SlackOauthToken) {
    token.id = nanoid()
  }
}
