import { BaseModel, beforeCreate, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import { nanoid } from 'nanoid'
import SlackOauthToken from './SlackOauthToken'

export default class ChannelUser extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public slackOauthTokenId: string

  @column()
  public slackId: string

  @belongsTo(() => SlackOauthToken)
  public slackToken: BelongsTo<typeof SlackOauthToken>
  // Create id
  @beforeCreate()
  public static async createId(channeluser: ChannelUser) {
    channeluser.id = nanoid()
  }
}
