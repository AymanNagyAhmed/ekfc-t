import { AbstractDocument } from '@/common/database/abstract.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserRole } from '@/modules/users/enums/user-role.enum';


@Schema({
  timestamps: true,
  versionKey: false,
  toJSON: {
    transform: (_, ret) => {
      delete ret.__v;
      delete ret.password;
      return ret;
    },
    virtuals: true,
  },
  collection: 'users',
})
export class User extends AbstractDocument {
  @Prop({
    required: false,
    trim: true,
    maxlength: 50,
    type: String
  })
  firstName?: string;

  @Prop({
    required: false,
    trim: true,
    maxlength: 50
  })
  lastName?: string;

  @Prop({
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: true,
    type: String
  })
  email: string;

  @Prop({
    required: true,
    minlength: 6
  })
  password: string;

  @Prop({
    default: false,
    index: true
  })
  isEmailVerified: boolean;

  @Prop({
    type: String,
    enum: UserRole,
    default: UserRole.USER,
    index: true
  })
  role: UserRole;

  @Prop({
    required: false,
    unique: true,
    sparse: true,
    trim: true
  })
  phoneNumber?: string;

  @Prop({
    default: true,
    index: true
  })
  isActive: boolean;

}

export const UserSchema = SchemaFactory.createForClass(User);

// Add compound index for common queries
UserSchema.index({ email: 1, isActive: 1 });

// Virtual for fullName
UserSchema.virtual('fullName').get(function(this: User) {
  if (this.firstName || this.lastName) {
    return `${this.firstName || ''} ${this.lastName || ''}`.trim();
  }
  return 'Anonymous User';
});
