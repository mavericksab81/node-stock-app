import { NOW } from 'sequelize';
import { Sequelize, DataTypes, Model } from 'sequelize';

export default class User extends Model {
    public user_id: number;
    public email: string;
    public username?: string;
    public password: string;
    public user_created_date: string;
    public last_login: string;
    public failed_attempts: number;
    public is_locked: boolean;
    public access_token: string;
}

export class Role extends Model {
  public id: number;
  public role: string;
}

export const UserMap = (sequelize: Sequelize) => {
  User.init({
    id: {
      type: DataTypes.STRING(1234),
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING(1234),
      allowNull: false
    },
    username: {
      type: DataTypes.STRING(1234)
    },
    password: {
      type: DataTypes.STRING(1234),
      allowNull: false
    },
    user_created_date: {
      type: DataTypes.STRING(1234),
      defaultValue: NOW,
      allowNull: false
    },
    last_login: {
      type: DataTypes.STRING(1234),
      defaultValue: NOW,
      allowNull: false
    },
    failed_attempts: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false
    },
    is_locked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    access_token: {
      type: DataTypes.STRING(1234),
      allowNull: false
    }
  }, 
  {
    sequelize,
    tableName: 'users',
    timestamps: false
  });

  Role.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    role: {
        type: DataTypes.STRING(1234),
        unique: true,
        allowNull: false
      },
  }, 
  {
      sequelize,
      tableName: 'role',
      timestamps: false
  });

  User.hasOne(Role, {
    sourceKey: 'id',
    foreignKey: 'user_id',
    as: 'roles' // this determines the name in `associations`!
  });
  
  // Role.belongsTo(User, { targetKey: 'id' });

  (async () => {
    await sequelize.sync();
  })();
}