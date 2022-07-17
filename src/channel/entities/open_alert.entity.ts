import { Field, InputType, ObjectType, } from "@nestjs/graphql";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, Unique } from "typeorm";
import { IsNumber, IsString, Length } from "class-validator"
import { CreatedAtEntity } from "src/common/entities/core.entity";
import { UserEntity } from "src/user/entities/user.entity";
import { ChannelEntity } from "./channel.entity";

@InputType("OpenAlertInput")
@ObjectType("OpenAlertOutput")
@Entity('OpenAlert')
@Unique("id", ["user_id", "channel_id"])
export class OpenAlertEntity extends CreatedAtEntity {
    /* 
        오픈 알림 신청 [임시]
    */

    @PrimaryColumn()
    user_id: number;

    @PrimaryColumn()
    channel_id: number;

    @Field(type => UserEntity)
    @ManyToOne(type => UserEntity, user => user.id)
    @JoinColumn({ name: "user_id" })
    user: UserEntity

    @Field(type => ChannelEntity)
    @ManyToOne(type => ChannelEntity, channel => channel.id)
    @JoinColumn({ name: "channel_id" })
    channel: ChannelEntity

    @Field(type => Number)
    @Column({ nullable: true })
    @IsNumber()
    mainContentId: number;

    @Field(type => String)
    @Column({ length: 200, comment: '이름' })
    @IsString()
    @Length(1, 200)
    name: string;

    @Field(type => String)
    @Column({ length: 20, comment: '연락처' })
    @IsString()
    @Length(10, 20)
    phone: string;
}