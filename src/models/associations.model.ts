import { NOW } from 'sequelize';
import { Sequelize, DataTypes, Model } from 'sequelize';
import Role from './role.model';

export class Person extends Model {
    public id: number;
    public email: string;
    public createdAt: string;
    public updatedAt: string;
}

export class Project extends Model {
    public id: number;
    public name: string;
    public createdAt: string;
    public updatedAt: string;
}

export class Address extends Model {
    public id: number;
    public address: string;
    public createdAt: string;
    public updatedAt: string;
}

export const AssociationMap = (sequelize: Sequelize) => {
  Person.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING(1234),
      allowNull: false
    },
    createdAt: {
      type: DataTypes.STRING(1234),
      defaultValue: NOW,
      allowNull: false
    },
    updatedAt: {
        type: DataTypes.STRING(1234),
        defaultValue: NOW,
        allowNull: false
    },
  }, 
  {
    sequelize,
    tableName: 'persons',
    timestamps: false
  });

  Project.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: new DataTypes.STRING(128),
        allowNull: false
      },
      createdAt: {
        type: DataTypes.STRING(1234),
        defaultValue: NOW,
        allowNull: false
      },
      updatedAt: {
          type: DataTypes.STRING(1234),
          defaultValue: NOW,
          allowNull: false
      },
    },
    {
      sequelize,
      tableName: 'projects'
    }
  );

  Address.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      address: {
        type: new DataTypes.STRING(128),
        allowNull: false
      },
      createdAt: {
        type: DataTypes.STRING(1234),
        defaultValue: NOW,
        allowNull: false
      },
      updatedAt: {
          type: DataTypes.STRING(1234),
          defaultValue: NOW,
          allowNull: false
      },
    },
    {
      sequelize,
      tableName: 'address'
    }
  );

  Person.hasMany(Project, {
    sourceKey: 'id',
    foreignKey: 'ownerId',
    as: 'projects' // this determines the name in `associations`!
  });
  
  Address.belongsTo(Person, { targetKey: 'id' });
  Person.hasOne(Address, { sourceKey: 'id' });

  (async () => {
    await sequelize.sync();
  })();
}