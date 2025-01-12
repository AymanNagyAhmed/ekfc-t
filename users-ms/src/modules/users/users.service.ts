import { Inject, Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { ResourceNotFoundException } from '@/common/exceptions/resource-not-found.exception';
import { InvalidInputException } from '@/common/exceptions/invalid-input.exception';
import { UnexpectedErrorException } from '@/common/exceptions/unexpected-error.exception';
import { User } from '@/modules/users/schemas/user.schema';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from '@/modules/users/dto/create-user.dto';
import { UsersRepository } from './users.repository';
import { UserRole } from '@/modules/users/enums/user-role.enum';

@Injectable()
export class UsersService {
  private readonly SALT_ROUNDS = 10;

  constructor(
    private readonly usersRepository: UsersRepository,
    ) {}

  /**
   * find all users
   */
  async findAll(): Promise<User[]> {
    return await this.usersRepository.find({});
  }

  /**
   * Creates a new user account
   * @param createUserDto User creation data
   * @returns Newly created user object
   * @throws InvalidInputException if email or phone number already exists
   */
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      // Check for existing email
      const existingUserWithEmail = await this.usersRepository.findOne({ 
        email: createUserDto.email 
      });
      if (existingUserWithEmail) {
        throw new InvalidInputException('Email already exists');
      }

      // Check for existing phone number if provided
      if (createUserDto.phoneNumber) {
        const existingUserWithPhone = await this.usersRepository.findOne({ 
          phoneNumber: createUserDto.phoneNumber 
        });
        if (existingUserWithPhone) {
          throw new InvalidInputException('Phone number already exists');
        }
      }

      const hashedPassword = await bcrypt.hash(createUserDto.password, this.SALT_ROUNDS);
      const newUser = await this.usersRepository.create({
        ...createUserDto,
        password: hashedPassword,
        role: createUserDto.role || UserRole.USER,
        isActive: createUserDto.isActive ?? true,
        isEmailVerified: createUserDto.isEmailVerified ?? false,
      });

      return newUser;
    } catch (error) {
      if (error instanceof InvalidInputException) {
        throw error;
      }
      // Log the actual error for debugging
      console.error('Error creating user:', error);
      
      // Check for MongoDB duplicate key error
      if (error.code === 11000) {
        const field = Object.keys(error.keyPattern)[0];
        throw new InvalidInputException(`${field} already exists`);
      }
      
      throw new UnexpectedErrorException('Error creating user');
    }
  }

  /**
   * Retrieves a user
   * @param id User's unique identifier
   * @returns User object
   * @throws ResourceNotFoundException if user not found
   */
  async findOne(id: string): Promise<User> {
    try {
      const user = await this.usersRepository.findOne({ _id: id });
      return user;
    } catch (error) {
      console.error('Error finding user:', error);
      throw new ResourceNotFoundException('User not found');
    }
  }

  /**
   * Updates user information
   * @param id User's unique identifier
   * @param updateUserDto Data to update
   * @returns Updated user object
   * @throws ResourceNotFoundException if user not found
   */
  async updateUser(id: string, updateUserDto: Partial<User>): Promise<User> {
    try {
      console.log('Updating user with ID:', id);
      console.log('Update data:', updateUserDto);

      const user = await this.usersRepository.findOneAndUpdate(
        { _id: id },
        updateUserDto
      );

      if (!user) {
        console.log('User not found');
        throw new ResourceNotFoundException('User not found');
      }

      console.log('User updated successfully:', user);
      return user;
    } catch (error) {
      console.error('Update error details:', error);
      
      if (error instanceof ResourceNotFoundException) {
        throw error;
      }
      
      throw new UnexpectedErrorException('Error updating user: ' + error.message);
    }
  }

  /**
   * Deletes a user account
   * @param id User's unique identifier
   * @throws ResourceNotFoundException if user not found
   */
  async deleteUser(id: string): Promise<void> {
    try {
      const result = await this.usersRepository.deleteOne({ _id: id });
      if (!result) {
        throw new ResourceNotFoundException('User not found');
      }
    } catch (error) {
      if (error instanceof ResourceNotFoundException) {
        throw error;
      }
      throw new UnexpectedErrorException('Error deleting user');
    }
  }

  /**
   * Validates user credentials
   * @param email User's email
   * @param password User's password
   * @returns User object if credentials are valid
   * @throws InvalidInputException if credentials are invalid
   */
  async validateUserCredentials(email: string, password: string): Promise<User> {
    try {
      const user = await this.usersRepository.findOne({ email });
      if (!user) {
        throw new InvalidInputException('Invalid credentials');
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new InvalidInputException('Invalid credentials');
      }

      return user;
    } catch (error) {
      if (error instanceof InvalidInputException) {
        throw error;
      }
      throw new UnexpectedErrorException('Error validating credentials');
    }
  }

  /**
   * Retrieves a user by their ID
   * @param id User's unique identifier
   * @returns User object
   * @throws ResourceNotFoundException if user not found
   */
  async getUser(getUserArgs: Partial<User>) {
    return this.usersRepository.findOne(getUserArgs);
  }

  /**
   * Validates the user credentials
   * @param email User's email
   * @param password User's password
   * @returns User object
   * @throws UnauthorizedException if credentials are invalid
   */
  async validateUser(email: string, password: string) {
    const user = await this.usersRepository.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return user;
  }

}
