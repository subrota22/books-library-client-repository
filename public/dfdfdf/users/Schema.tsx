
import { Field, ObjectType, InputType } from "type-graphql" ;

    @ObjectType()
    export class User {
        @Field()
        name!: string
        @Field()
        email!: string
        @Field()

    }
    
    @InputType()
    export class UserInput implements Pick<User, "name" | "email"> {
        @Field()
        name!: string
        @Field()
        email!: string
    }
