const __awaiter = (this && this.__awaiter)
  || function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P((resolve) => {
          resolve(value);
        });
    }
    return new (P || (P = Promise))((resolve, reject) => {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
const __importDefault = (this && this.__importDefault)
  || function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const mongoose_1 = __importDefault(require('mongoose'));
const global_shop_1 = __importDefault(require('../models/gshop'));
const global_users_1 = __importDefault(require('../models/gusers'));
const jobs_js_1 = __importDefault(require('./data/jobs.js'));

class SimplyEco {
  constructor(client, dbUrl, options = {}) {
    if (!client) throw new TypeError('No client provided.');

    if (!dbUrl) throw new TypeError('dbUrl was not provided!');
    this.Client = client;
    // this.currency = "<:currencyy_Blossomii:1016556841825747037>"
    client.once(
      'ready',
      () => (this.currency = client.emoji('currencyy_Blossomii')),
    );
    this.options = options;
    mongoose_1.default
      .connect(dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then((connection) => {
        this.connected = true;
        this.mongoClient = connection;
        if (options.notify === false) return;
        return console.log(
          '\x1b[32m%s\x1b[0m',
          '[INFO] SimplyEco connected to Database',
        );
      })
      .catch((e) => {
        throw new Error(`An Error Just Occurred. ${e}`);
      });
  }

  /**
   * SetWeekly
   * @description Set a weekly amount for a guild or global.
   * @param {{ GuildID?: string, Amt: number }}
   * @example SetWeekly({ GuildID: "881789379553656872", Amt: 10000 })
   */
  SetWeekly({ Amt } = { Amt: 0 }) {
    let _a;
    return __awaiter(this, void 0, void 0, function* () {
      if (!Amt) throw new TypeError('A Amount to exchange must be specified.');
      const globalData = yield global_shop_1.default.findOne({
        Id: this.Client.user.id,
      });
      if (!globalData) {
        const Add = new global_shop_1.default({
          gid: this.Client.user.id,
          weeklyAmt: Number(Amt),
        });
        yield Add.save();
      }
      if (globalData.weeklyAmt === Number(Amt)) {
        return {
          status: 'error',
          value: 'Already Exists',
          description: `Weekly Amount is already set as ${this.currency} ${Amt}`,
        };
      }
      globalData.weeklyAmt = Number(Amt);
      globalData.save();
      return {
        status: 'success',
        value: 'Weekly Amount Changed',
        description: `Successfully set ${this.currency} ${Amt} as Weekly Amount`,
      };
    });
  }

  /**
   * SetDaily
   * @description Set a daily amount for a guild or global.
   * @param {{ GuildID?: string, Amt: number }}
   * @example SetDaily({ GuildID: "881789379553656872", Amt: 10000 })
   */
  SetDaily({ Amt } = { Amt: 0 }) {
    let _a;
    return __awaiter(this, void 0, void 0, function* () {
      if (!Amt) throw new TypeError('A Amount to exchange must be specified.');
      const globalData = yield global_shop_1.default.findOne({
        Id: this.Client.user.id,
      });
      if (!globalData) {
        const Add = new global_shop_1.default({
          Id: this.Client.user.id,
          dailyAmt: Number(Amt),
        });
        yield Add.save();
      }
      if (globalData.dailyAmt === Number(Amt)) {
        return {
          status: 'error',
          value: 'Already Exists',
          description: `Daily Amount is already set as ${this.currency} ${Amt}`,
        };
      }
      globalData.dailyAmt = Number(Amt);
      globalData.save();
      return {
        status: 'success',
        value: 'Daily Amount Changed',
        description: `Successfully set ${this.currency} ${Amt} as Daily Amount`,
      };
    });
  }

  /**
   * Transfer
   * @description Transfer money over 2 people. GuildID property is not needed for global use.
   * @param {{ GuildID?: string, User1ID: string, User2ID: string, Amt: number }}
   * @example Transfer({ GuildID: "881789379553656872", Amt: 10000, User1ID: "777474453114191882", User2ID: "753974636508741673" })
   */
  Transfer(
    { User1ID, User2ID, Amt } = {
      GuildID: null,
      Amt: 0,
      User1ID: null,
      User2ID: null,
    },
  ) {
    let _a;
    return __awaiter(this, void 0, void 0, function* () {
      if (!User1ID) throw new TypeError('A User must be specified.');
      if (!User1ID) throw new TypeError('A User must be specified.');
      if (!Amt) throw new TypeError('A Amount to exchange  must be specified.');
      if (isNaN(Amt)) throw new TypeError('Amount is not a number');
      const User1Data = yield global_users_1.default.findOne({
        userID: User1ID,
      });
      const User2Data = yield global_users_1.default.findOne({
        userID: User2ID,
      });
      if (User1Data.wallet < Amt) {
        return {
          status: 'error',
          value: 'Not Enough Cash',
          description: 'You dont have enough cash in your wallet',
        };
      }
      if (!User1Data) {
        const AddUser = new global_users_1.default({
          userID: User1ID,
        });
        yield AddUser.save();
        return {
          status: 'error',
          value: 'No Cash',
          description: `You don't have a single ${this.currency} in your wallet`,
        };
      } if (!User2Data) {
        const AddUser = new global_users_1.default({
          userID: User2ID,
          wallet: Number(Amt),
        });
        User1Data.wallet -= Number(Amt);
        yield User1Data.save();
        yield AddUser.save();
        return {
          status: 'success',
          value: 'Transfer Successful',
          description: `Successfully transferred ${this.currency} ${Amt} to <@${User2ID.userID}>`,
        };
      }
      User1Data.wallet -= Number(Amt);
      User2Data.wallet += Number(Amt);
      yield User1Data.save();
      yield User2Data.save();
      return {
        status: 'success',
        value: 'Transfer Successful',
        description: `Successfully transferred ${this.currency} ${Amt} <@${User2Data.userID}>. Remaining Balance: ${this.currency} ${User1Data.wallet}`,
      };
    });
  }

  /**
   * RemoveItem
   * @description Remove an item from the shop.
   * @param {{ GuildID?: string, Item: string | number }}
   * @example RemoveItem({ GuildID: "881789379553656872", Item: "car" })
   */
  RemoveItem({ Item } = { GuildID: null, Item: null }) {
    let _a; let _b; let
      _c;
    return __awaiter(this, void 0, void 0, function* () {
      if (!Item) throw new TypeError('A Item Id must be specified.');
      if (
        ((_a = this.options) === null || _a === void 0 ? void 0 : _a.global)
        === true
      ) {
        const Global = yield global_shop_1.default.findOne({
          Id: this.Client.user.id,
        });
        if (!Global) {
          return {
            status: 'error',
            value: 'No Items',
            description: 'No Item exists in shop',
          };
        }
        Global.shopItems = Global.shopItems.filter(
          (item) => item.id !== Item || item.Name !== Item.toString(),
        );
        yield Global.save();
        return {
          status: 'success',
          value: Global.shopItems,
          description: `Successfully removed ${Item} from shop`,
        };
      }
    });
  }

  /**
   * AddItem
   * @param {{GuildID?: string, ItemName: string, Price: number, SellPrice: number }}
   * @description Add an item to a user. GuildID is not needed for global use.
   * @example AddItem({ GuildID: "881789379553656872", ItemName: "very expensive pancakes", Price: 10000, SellPrice: 1000 })
   */
  AddItem(
    {
      ItemName, Price, SellPrice, Type, Use,
    } = {
      GuildID: null,
      ItemName: null,
      Price: null,
      SellPrice: null,
      Type: null,
      Use: null,
    },
  ) {
    let _a;
    return __awaiter(this, void 0, void 0, function* () {
      if (!ItemName) throw new TypeError('A Item Name must be specified.');
      if (!Price) throw new TypeError('A Price must be specified');
      if (!SellPrice) throw new TypeError('A SellPrice  must be specified.');
      if (!Type) {
        throw new TypeError(
          'A Type (Sellable, Usable or Collectable) must be specified',
        );
      }
      if (!Use) throw new TypeError('A Use (A Use or NonUsable) must be specified');
      const Global = yield global_shop_1.default.findOne({
        Id: this.Client.user.id,
      });
      if (this.options.global === true) {
        if (!Global) {
          const Add2 = new global_shop_1.default({
            userID: this.Client.user.id,
          });
          const Item = {
            Name: ItemName,
            Price,
            Sell: SellPrice,
            Type,
            Use,
            id: 1,
          };
          Add2.shopItems.push(Item);
          yield Add2.save();
          return {
            status: 'success',
            value: Add2.shopItems,
            description: `Successfully added ${ItemName} with Price of ${this.currency} ${Price} and Selling Price ${this.currency} ${SellPrice}. It is ${Type} item`,
          };
        }
        if (Global.shopItems.map((item) => item.Name === ItemName)) {
          return {
            status: 'error',
            value: 'Already Exists',
            description: `${ItemName} already exists in shop`,
          };
        }
        const Item = {
          Name: ItemName,
          Price,
          Sell: SellPrice,
          Type,
          Use,
          id: Global.shopItems.length,
        };
        Global.shopItems.push(Item);
        yield Global.save();
        return {
          status: 'success',
          value: Global.shopItems,
          description: `Successfully added ${ItemName} with Price of ${this.currency} ${Price} and Selling Price ${this.currency} ${SellPrice}. It is ${Type} Item`,
        };
      }
    });
  }

  /**
   * BuyItem
   * @param {{GuildID?: string, Item: string | number, UserID: string }}
   * @description Buy an item to a user. GuildID is not needed for global use.
   * @example BuyItem({ GuildID: "881789379553656872", ItemName: "very expensive pancakes", UserID: "753974636508741673" })
   */
  BuyItem({ UserID, Item } = { Item: null, UserID: null }) {
    let _a;
    return __awaiter(this, void 0, void 0, function* () {
      if (!UserID) throw new TypeError('A user ID must be specified');
      if (
        ((_a = this.options) === null || _a === void 0 ? void 0 : _a.global)
        === true
      ) {
        const Global = yield global_shop_1.default.findOne({
          Id: this.Client.user.id,
        });
        if (!Global) {
          return false;
        }
        const item1 = Global.shopItems.find((item) => _checkItem(item, Item));

        const UserData = yield global_users_1.default.findOne({
          userID: UserID,
        });
        if (!item1.Name) {
          return {
            status: 'error',
            value: 'Item Not Found',
            description: `${Item} not found in Shop`,
          };
        }
        if (UserData.wallet < item1.Price) {
          return {
            value: `Not Enough ${this.currency}`,
            status: 'error',
            description: `You dont have enough ${this.currency} in your wallet`,
          };
        }
        const item = [
          {
            Name: item1.Name,
            Price: item1.Price,
            Sell: item1.Sell,
            Type: item1.Type,
            Use: item1.Use,
            Quantity: 0,
            id: item1.id,
          },
        ];
        if (!UserData) {
          const AddUser = new global_users_1.default({
            userID: UserID,
          });
          yield AddUser.save();
          return {
            value: `No ${this.currency}`,
            status: 'error',
            description: `You don't have a single ${this.currency} in your wallet`,
          };
        }
        if (UserData.inventory.length === 0) {
          item[0].Quantity += 1;
          UserData.inventory.push(item[0]);
          UserData.wallet -= Number(item[0].Price);
          yield UserData.save();
          return {
            status: 'success',
            value: 'Purchase Successful',
            description: `Successfully paid ${this.currency} ${item[0].Price} for buying ${item[0].Name}`,
          };
        }
        const item2 = UserData.inventory.find((item) => _checkItem(item, Item));

        if (item2) {
          item[0].Quantity = Number(item2.Quantity) + 1;
          UserData.Wallet -= Number(item[0].Price);
          yield UserData.save();
          yield global_users_1.default.findOneAndUpdate(
            { userID: UserID, 'inventory.Name': item2.Name },
            { $set: { 'inventory.$.Quantity': item2.Quantity + 1 } },
          );
          return {
            status: 'success',
            value: 'Purchase Successful',
            description: `Successfully Purchased ${item[0].Name} with price of ${this.currency} ${item[0].Price}. You have ${item[0].Quantity} ${item[0].Name}\n Balance:\n • Wallet: ${this.currency} ${UserData.wallet}`,
          };
        }
        item[0].Quantity = 1;
        UserData.inventory.push(item[0]);
        UserData.wallet -= Number(item[0].Price);
        yield UserData.save();

        return {
          status: 'success',
          value: 'Purchase Successful',
          description: `Successfully Purchased ${item[0].Name} with price of ${this.currency} ${item[0].Price}. You have ${item[0].Quantity} ${item[0].Name}\n Balance:\n • Wallet: ${this.currency} ${UserData.wallet}`,
        };
      }
    });
  }

  /**
   * SellItem
   * @param {{GuildID?: string, Item: string | number, UserID: string }}
   * @description Sell an item. GuildID is not needed for global use.
   * @example SellItem({ GuildID: "881789379553656872", ItemName: "very expensive pancakes", user: "753974636508741673" })
   */
  SellItem({ UserID, Item } = { UserID: null, Item: null }) {
    let _a; let
      _b;
    return __awaiter(this, void 0, void 0, function* () {
      if (!UserID) throw new TypeError('A member ID must be specified');
      if (!Item) throw new TypeError('A Item Name must be specified');
      if (
        ((_a = this.options) === null || _a === void 0 ? void 0 : _a.global)
        === true
      ) {
        const Global = yield global_shop_1.default.findOne({
          Id: this.Client.user.id,
        });
        if (!Global) {
          return false;
        }
        const UserData = yield global_users_1.default.findOne({
          userID: UserID,
        });
        if (!UserData) {
          const AddUser = new global_users_1.default({
            userID: UserID,
          });
          yield AddUser.save();
          return {
            status: 'error',
            value: 'No Item',
            description: 'You dont have item in your Inventory',
          };
        }
        if (UserData.inventory.length === 0) {
          return {
            status: 'error',
            value: 'No Item in Inventory',
            description: 'You dont have any item in your inventory',
          };
        }
        const item2 = UserData.inventory.find((item) => _checkItem(item, Item));

        if (item2.Type === 'Collectable') {
          return {
            status: 'error',
            value: 'Collectable Item',
            description: `You cant sell a Collectable Item: ${item2.Name}`,
          };
        }
        if (!item2) {
          return {
            status: 'error',
            value: 'Not Purchased',
            description: 'You dont own this item',
          };
        }
        if (item2.Quantity === 1) {
          UserData.inventory = UserData.inventory.filter(
            (item) => item.Name != Item,
          );
          UserData.wallet += Number(item2.Sell);
          yield UserData.save();
          return {
            status: 'success',
            value: 'Sale Successful',
            description: `Successfully sold ${item2.Name} for ${
              this.currency
            } ${item2.Sell}.You have ${Number(item2.Quantity - 1)} ${
              item2.Name
            }\n Balance:\n • Wallet: ${this.currency} ${UserData.wallet}`,
          };
        } if (item2.Quantity > 1) {
          UserData.wallet += Number(item2.Sell);
          yield UserData.save();
          yield global_users_1.default.findOneAndUpdate(
            { userID: UserID, 'inventory.Name': item2.Name },
            { $set: { 'inventory.$.Quantity': item2.Quantity - 1 } },
          );
          return {
            status: 'success',
            value: 'Sale Successful',
            description: `Successfully sold ${item2.Name} for ${
              this.currency
            } ${item2.Sell}. You have ${Number(item2.Quantity - 1)} ${
              item2.Name
            }\n Balance:\n • Wallet: ${this.currency} ${UserData.wallet}`,
          };
        }
      }
    });
  }

  /**
   * Daily
   * @param {{GuildID?: string, UserID: string }}
   * @description Collect the daily amount for an user. GuildID is not needed for global use.
   * @example Daily({ GuildID: "881789379553656872", UserID: "753974636508741673" })
   */
  Daily({ UserID } = { UserID: null }) {
    let _a;
    return __awaiter(this, void 0, void 0, function* () {
      if (!UserID) throw new TypeError('A User ID must be specified');

      const UserData = yield global_users_1.default.findOne({
        userID: UserID,
      });
      const globalData = yield global_shop_1.default.findOne({
        Id: this.Client.user.id,
      });
      let AMT;
      if (!globalData) {
        AMT = 2000;
      }
      if (globalData) {
        AMT = globalData.dailyAmt;
      }
      const timeout = 86400000;
      if (!UserData) {
        const AddUser = new global_users_1.default({
          userID: UserID,
          wallet: Number(AMT),
          lastUsedDaily: Date.now(),
        });
        yield AddUser.save();
        return {
          status: 'success',
          value: 'Reward Claiming Successful',
          description: `Successfully transferred ${this.currency} ${AMT} to your wallet as your Daily Reward. Claim again in __**${_msToTime(
            time,
          )}**__`,
        };
      }
      const daily = UserData.lastUsedDaily;
      if (daily !== null && timeout - (Date.now() - daily.getTime()) > 0) {
        const time = timeout - (Date.now() - daily.getTime());
        return {
          status: 'error',
          value: 'Already Claimed',
          description: `You have already claimed your daily reward. Wait for __**${_msToTime(
            time,
          )}**__ to claim again`,
        };
      } else {
        UserData.wallet += Number(AMT);
        UserData.lastUsedDaily = new Date();
        yield UserData.save();
        const time = timeout - (Date.now() - daily.getTime());
        return {
          status: 'success',
          value: 'Reward Claiming Successful',
          description: `Successfully transferred ${this.currency} ${AMT} to your wallet as your Daily Reward. Claim again in __**${_msToTime(
            time,
          )}**__`,
        };
      }
    });
  }

  /**
   * Weekly
   * @param {{GuildID?: string, UserID: string }}
   * @description Collect the weekly amount for an user. GuildID is not needed for global use.
   * @example Daily({ GuildID: "881789379553656872", UserID: "753974636508741673" })
   */
  Weekly({ UserID } = { UserID: null }) {
    let _a;
    return __awaiter(this, void 0, void 0, function* () {
      if (!UserID) throw new TypeError('A member ID must be specified');
      const UserData = yield global_users_1.default.findOne({
        userID: UserID,
      });
      const GuildData = yield global_shop_1.default.findOne({
        Id: this.Client.user.id,
      });
      let AMT;
      if (!GuildData) {
        AMT = 10000;
      }
      if (GuildData) {
        AMT = GuildData.weeklyAmt;
      }
      const timeout = 604800000;
      if (!UserData) {
        const AddUser = new global_users_1.default({
          userID: UserID,
          wallet: Number(AMT),
          lastUsedWeekly: Date.now(),
        });
        yield AddUser.save();
        const time = timeout - (Date.now() - UserData.lastUsedWeekly.getTime()) > 0;
        return {
          status: 'success',
          value: 'Reward Claiming Successful',
          description: `Successfully transferred ${
            this.currency
          } ${AMT} to your wallet as your Weekly Reward. Claim again in __**${_msToTime(
            time,
          )}**__`,
        };
      }
      const weekly = UserData.lastUsedWeekly;
      if (weekly !== null && timeout - (Date.now() - weekly.getTime()) > 0) {
        const time = timeout - (Date.now() - weekly.getTime());
        return {
          status: 'error',
          value: 'Already Claimed',
          description: `You have successfully claimed your weekly reward. Wait for __**${_msToTime(
            time,
          )}**__ to claim again`,
        };
      }
      UserData.wallet += Number(AMT);
      UserData.lastUsedWeekly = new Date();
      yield UserData.save();
      const time = timeout - (Date.now() - UserData.lastUsedWeekly.getTime());
      return {
        status: 'success',
        value: 'Reward Claiming Successful',
        description: `Successfully transferred ${
          this.currency
        } ${AMT} to your wallet as your Weekly Reward. Claim again in __**${_msToTime(
          time,
        )}**__`,
      };
    });
  }

  /**
   * GetInv
   * @param {{GuildID?: string, UserID: string }}
   * @description Get an inventory of an user. GuildID is not needed for global use.
   * @example GetInv({ GuildID: "881789379553656872", UserID: "753974636508741673" })
   */
  GetInv({ UserID } = { UserID: null }) {
    let _a;
    return __awaiter(this, void 0, void 0, function* () {
      if (!UserID) throw new TypeError('A user ID must be specified');
      const User = yield global_users_1.default.findOne({
        userID: UserID,
      });
      if (!User) {
        const AddUser = new global_users_1.default({
          userID: UserID,
        });
        yield AddUser.save();
        return {
          status: 'error',
          value: 'No Item Found',
          description: 'There is nothing in your inventory',
        };
      }
      if (!User.inventory) {
        return {
          status: 'error',
          value: 'No Item Found',
          description: 'There is nothing in your inventory',
        };
      }
      return {
        status: 'success',
        value: User.inventory,
        description: 'Here are the items from your inventory',
      };
    });
  }

  /**
   * GetInv
   * @param {{GuildID?: string, UserID: string }}
   * @description Get an user data of an user. GuildID is not needed for global use.
   * @example GetInv({ GuildID: "881789379553656872", UserID: "753974636508741673" })
   */
  GetUser({ UserID } = { UserID: null }) {
    let _a;
    return __awaiter(this, void 0, void 0, function* () {
      // Required Parameters
      if (!UserID) throw new TypeError('A user ID must be specified');
      const User = yield global_users_1.default.findOne({
        userID: UserID,
      });
      if (!User) {
        const AddUser = new users_1.default({
          userID: UserID,
        });
        yield AddUser.save();
        return AddUser;
      }
      return User;
    });
  }

  /**
   * GetBal
   * @param {{GuildID?: string, UserID: string }}
   * @description Get an balance of an user. GuildID is not needed for global use.
   * @example GetBal({ GuildID: "881789379553656872", UserID: "753974636508741673" })
   */
  GetBal({ UserID } = { UserID: null }) {
    let _a;
    return __awaiter(this, void 0, void 0, function* () {
      if (!UserID) throw new TypeError('A member ID must be specified');
      const Bal = yield global_users_1.default.findOne({
        userID: UserID,
      });
      if (!Bal) {
        const AddUser = new global_users_1.default({
          userID: UserID,
        });
        yield AddUser.save();
        return {
          status: 'error',
          value: `No ${this.currency} In Wallet`,
          description: `You dont have a single ${this.currency} in your wallet`,
        };
      }
      return {
        status: 'success',
        value: Bal.wallet,
        description: `Wallet: ${this.currency} `,
      };
    });
  }

  /**
   * GetBankBal
   * @param {{GuildID?: string, UserID: string }}
   * @description Get bank balance of an user. GuildID is not needed for global use.
   * @example GetBankBal({ GuildID: "881789379553656872", UserID: "753974636508741673" })
   */
  GetBankBal({ UserID } = { UserID: null }) {
    let _a;
    return __awaiter(this, void 0, void 0, function* () {
      // Required Parameters
      if (!UserID) throw new TypeError('A member ID must be specified');
      const Bal = yield global_users_1.default.findOne({
        userID: UserID,
      });
      if (!Bal) {
        const AddUser = new global_users_1.default({
          userID: UserID,
        });
        yield AddUser.save();
        return {
          status: 'error',
          value: `No ${this.currency} In Wallet`,
          description: `You dont have a single ${this.currency} in your wallet`,
        };
      }
      return {
        status: 'success',
        value: Bal.bank,
        description: `Bank: ${this.currency} `,
      };
    });
  }

  /**
   * AddMoney
   * @param {{GuildID?: string, Amt: number, UserID: string }}
   * @description Add money to an user. GuildID is not needed for global use.
   * @example AddMoney({ GuildID: "881789379553656872", UserID: "753974636508741673" })
   */
  AddMoney({ UserID, Amt } = { Amt: null, UserID: null }) {
    let _a;
    return __awaiter(this, void 0, void 0, function* () {
      // Required Parameters
      if (!UserID) throw new TypeError('A user ID must be specified');
      if (!Amt) throw new TypeError('An amount of money must be specified.');
      if (isNaN(Amt)) throw new TypeError('Amount of money must be in number.');
      const UserData = yield global_users_1.default.findOne({
        userID: UserID,
      });
      // Create Data If None Is Found
      if (!UserData) {
        const AddUser = new global_users_1.default({
          userID: UserID,
          wallet: Number(Amt),
        });
        yield AddUser.save();
        return {
          status: 'success',
          value: 'Money Adding Successfully',
          description: `Added ${this.currency} ${Amt} to <@${UserID}>'s wallet. Balance: ${this.currency} ${AddUser.wallet}`,
          wallet: AddUser.wallet,
        };
      }
      // Update Wallet
      UserData.wallet += Number(Amt);
      yield UserData.save();
      return {
        status: 'success',
        value: 'Money Adding Successful',
        description: `Added ${this.currency} ${Amt} to <@${UserID}>'s wallet`,
        wallet: UserData.wallet,
      };
    });
  }

  /**
   * RemoveMoney
   * @param {{GuildID?: string, UserID: string, Amt: number }}
   * @description Remove money to an user. GuildID is not needed for global use.
   * @example AddMoney({ GuildID: "881789379553656872", UserID: "753974636508741673", Amt: 1000 })
   */
  RemoveMoney({ UserID, Amt } = { Amt: null, UserID: null }) {
    let _a;
    return __awaiter(this, void 0, void 0, function* () {
      // Required Parameters
      if (!UserID) throw new TypeError('A user ID must be specified');
      if (!Amt) throw new TypeError('An amount of money must be specified.');
      if (isNaN(Amt)) throw new TypeError('Amount of money must be in number.');
      const UserData = yield global_users_1.default.findOne({
        userID: UserID,
      });
      // If None Is Found
      if (!UserData) {
        return {
          status: 'error',
          value: `No ${this.currency} In Wallet`,
          description: `<@${UserID}> dont have a single ${this.currency} in their wallet. Balance: ${this.currency} ${UserData.wallet}`,
        };
      }
      // Update Wallet
      UserData.wallet -= Number(Amt);
      yield UserData.save();
      return {
        status: 'success',
        value: 'Money Removing Successful',
        description: `Removed ${this.currency} ${Amt} from <@${UserID}>'s wallet. Balance: ${this.currency} ${UserData.wallet}`,
      };
    });
  }

  /**
   * RemoveMoney
   * @param {{GuildID?: string }}
   * @description Get the richest people. GuildID is not needed for global use.
   * @example GetRich({ GuildID: "881789379553656872" })
   */
  GetRich({ GuildID }) {
    let _a;
    return __awaiter(this, void 0, void 0, function* () {
      const lb = yield global_users_1.default
        .find({})
        .sort([['wallet' + 'bank', 'descending']])
        .exec()
        .catch((e) => {
          throw new TypeError(`An Error Just Occurred. ${e.stack}`);
        });
      if (lb.length == 0) {
        return {
          status: 'error',
          value: 'No Data Found',
          description: "There's No One in the leaderboard",
        };
      }
      return {
        status: 'success',
        value: lb,
        description: "Here's the leaderboard",
      };
    });
  }

  /**
   * GetProfile
   * @param {{GuildID?: string, UserID: string }}
   * @description Get a profile data of an user. GuildID is not needed for global use.
   * @example GetProfile({ GuildID: "881789379553656872", UserID: "753974636508741673" })
   */
  GetProfile({ UserID }) {
    let _a;
    return __awaiter(this, void 0, void 0, function* () {
      if (!UserID) throw new TypeError('A user id must be specified.');
      const User = yield global_users_1.default.findOne({
        userID: UserID,
      });
      if (!User) {
        return {
          status: 'error',
          value: 'No Profile Found',
          description: 'You dont have a profile yet',
        };
      }
      const Profile = [];
      Profile.push({
        user: User.userID,
        wallet: User.wallet,
        job: User.job,
        bank: User.bank,
        inventory: User.inventory,
        salary: User.salary,
      });
      return {
        status: 'success',
        value: Profile,
        description: "Here's your profile",
      };
    });
  }

  /**
   * Deposit
   * @param {{UserID: string?: string, Amt: number | "max"}}
   * @description Deposit money to an bank. GuildID is not needed for global use.
   * @example Deposit({ GuildID: "881789379553656872", Amt: 10, UserID: "753974636508741673" })
   */
  Deposit({ UserID, Amt } = { UserID: null, Amt: null }) {
    let _a;
    return __awaiter(this, void 0, void 0, function* () {
      if (!UserID) throw new SyntaxError('A user ID must be specified.');
      if (!Amt) throw new SyntaxError('An amount must be specified.');

      let Balance = yield global_users_1.default.findOne({
        userID: UserID,
      });
      if (!Balance) {
        Balance = yield new global_users_1.default({
          userID: UserID,
        });
        yield Balance.save();
        return {
          status: 'error',
          value: `No ${this.currency} In Wallet`,
          description: `You dont have a single ${this.currency} in your wallet`,
        };
      }
      if (Balance.wallet < Amt) {
        return {
          status: 'error',
          value: `Not Enough ${this.currency} In Wallet`,
          description: `You dont have enough ${this.currency} in your wallet`,
        };
      }
      let amt;
      if (Amt === 'max') {
        amt = Balance.wallet;
      } else if (Number(Amt)) {
        amt = Amt;
      } else if (Amt.endsWith('k')) {
        amt = Amt.replace('k', '') * 1000;
        amt = Number(amt) ? amt : 0;
      } else {
        return {
          status: 'error',
          value: 'Invalid number',
          description: 'Enter a valid string/number like 100/max/1k to deposit',
        };
      }

      Balance.bank += Number(amt);
      Balance.wallet -= Number(amt);
      yield Balance.save();
      return {
        status: 'success',
        value: 'Deposited Successfully',
        description: `Deposited ${this.currency} ${amt}\n Balances:\n • Wallet: ${this.currency} ${Balance.wallet}\n • Bank: ${this.currency} ${Balance.bank}`,
      };
    });
  }

  /**
   * Withdraw
   * @param {{UserID: string, Amt: number | "max"}}
   * @description Withdraw money from a bank. GuildID is not needed for global use.
   * @example Withdraw({ GuildID: "881789379553656872", Amt: 10, UserID: "753974636508741673" })
   */
  Withdraw({ UserID, Amt } = { Amt: null, UserID: null }) {
    let _a;
    return __awaiter(this, void 0, void 0, function* () {
      if (!UserID) throw new SyntaxError('A member ID must be specified.');
      if (!Amt) throw new SyntaxError('An amount must be specified.');
      let Balance = yield global_users_1.default.findOne({
        userID: UserID,
      });
      if (!Balance) {
        Balance = yield new global_users_1.default({
          userID: UserID,
        });
        yield Balance.save();
        return {
          status: 'error',
          value: `No ${this.currency} In Bank`,
          description: `You dont have a single ${this.currency} in your Bank`,
        };
      }
      if (Balance.bank < Amt) {
        return {
          status: 'error',
          value: `Not Enough ${this.currency} In Bank`,
          description: `You dont have enough ${this.currency} in your wallet`,
        };
      }
      let amt;
      if (Amt === 'max') {
        amt = Balance.bank;
      } else if (Number(Amt)) {
        amt = Amt;
      } else if (Amt.endsWith('k')) {
        amt = Amt.replace('k', '') * 1000;
        amt = Number(amt) ? amt : 0;
      } else {
        return {
          status: 'error',
          value: 'Invalid number',
          description:
            'Enter a valid string/number like 100/max/1k to withdraw',
        };
      }
      Balance.bank -= Number(amt);
      Balance.wallet += Number(amt);
      yield Balance.save();
      return {
        status: 'success',
        value: 'Withdrawal Successfully',
        description: `Withdrew ${this.currency} ${amt}\n Balances:\n • Wallet: ${this.currency} ${Balance.wallet}\n • Bank: ${this.currency} ${Balance.bank}`,
      };
    });
  }

  /**
   * GetShop
   * @param {{ GuildID?: string}}
   * @description Get shop items. GuildID is not needed for global use.
   * @example GetShop({ GuildID: "881789379553656872" })
   */
  GetShop({ GuildID } = {}) {
    let _a; let
      _b;
    return __awaiter(this, void 0, void 0, function* () {
      // Required Parameters
      if (
        ((_a = this.options) === null || _a === void 0 ? void 0 : _a.global)
        == true
      ) {
        const Gshop = yield global_shop_1.default.findOne({
          Id: this.Client.user.id,
        });
        if (!Gshop) {
          const Ggshop = new global_shop_1.default({
            Id: this.Client.user.id,
          });
          yield Ggshop.save();
          if (!Ggshop.shopItems) {
            return {
              status: 'error',
              value: 'No Item Found In Shop',
              description: 'There is nothing in shop',
            };
          }
          return {
            status: 'success',
            value: Ggshop.shopItems,
            description: 'Here are the items from Shop',
          };
        }
        if (!Gshop.shopItems) {
          return {
            status: 'error',
            value: 'No Item Found In Shop',
            description: 'There is nothing in shop',
          };
        }
        return {
          status: 'success',
          value: Gshop.shopItems,
          description: 'Here are the items from Shop',
        };
      }
    });
  }

  /**
   * GetItem
   * @param {{GuildID?: string, Item: string }}
   * @description Get an item data. GuildID is not needed for global use.
   * @example GetItem({ GuildID: "881789379553656872", Item: "pancakes" })
   */
  GetItem({ Item } = { Item: null }) {
    return __awaiter(this, void 0, void 0, function* () {
      if (!Item) throw new TypeError('No item name or id specified.');
      if (this.options.global === true) {
        const Global = yield global_shop_1.default.findOne({
          Id: this.Client.user.id,
        });
        if (!Global) return null;
        return Global.shopItems.filter((item) => _checkItem(item, Item))[0];
      }
    });
  }

  /**
   * ReassignJob
   * @param {{ GuildID?: string, Job: string, UserID: string}}
   * @description Reassign a job. GuildID is not needed for global use.
   * @example GetShop({ GuildID: "881789379553656872", UserID: "753974636508741673", Job: "Doctor" })
   */
  ReassignJob({ UserID, Job } = { Job: null, UserID: null }) {
    let _a;
    return __awaiter(this, void 0, void 0, function* () {
      if (!UserID) throw new TypeError('A user ID must be specified.');
      if (!Job) throw new TypeError('A job must be specified.');
      const user = yield global_users_1.default.findOne({
        userID: UserID,
      });
      if (!user) {
        const newUser = new global_users_1.default({
          userID: UserID,
        });
        return newUser.save();
      }
      const job = jobs_js_1.default.find(
        (job) => job.Name.toLocaleLowerCase() === Job.toLocaleLowerCase(),
      );
      const current = user.job;

      if (!current) {
        return {
          status: 'error',
          value: 'Not Working',
          description: 'You dont have any job. Get one before reassigning',
        };
      } if (!job) {
        const Jobss = [];
        jobs_js_1.default.map((x) => {
          Jobss.push({
            Name: x.Name,
            Salary: x.Salary,
          });
        });
        return {
          status: 'error2',
          value: Jobss,
          description: 'Select a right job from the list below',
        };
      } if (job.Name) {
        user.job = job.Name;
        user.salary = job.Salary;
        yield user.save();
        return {
          status: 'success',
          value: 'Reassigning Job Successful',
          description: `Successfully gave you the job: ${job.Name} with a salary of ${this.currency} ${job.Salary}`,
        };
      }
    });
  }

  /**
   * RemoveJob
   * @param {{ GuildID?: string,  UserID: string}}
   * @description Remove a job. GuildID is not needed for global use.
   * @example RemoveJob({ GuildID: "881789379553656872", userId: "753974636508741673"})
   */
  RemoveJob({ UserID } = { UserID: null }) {
    let _a;
    return __awaiter(this, void 0, void 0, function* () {
      if (!UserID) throw new SyntaxError('A user ID must be specified.');
      const user = yield global_users_1.default.findOne({ userID: UserID });
      if (!user) {
        const newUser = new global_users_1.default({
          userID: UserID,
        });
        yield newUser.save();
        return {
          status: 'error',
          value: 'Not Working',
          description: 'You are not working. Get a job before Removing',
        };
      }
      const current = user === null || user === void 0 ? void 0 : user.job;
      if (!current) {
        return {
          status: 'error',
          value: 'Not Working',
          description: 'You are not working. Get a job before Removing',
        };
      } if (current) {
        user.salary = 0;
        user.job = null;
        user.jobLeft = new Date();
        yield user.save();
        return {
          status: 'success',
          value: 'Job Removed',
          description: 'Successfully removed your job',
        };
      }
    });
  }

  /**
   * SetJob
   * @param {{ GuildID?: string,  UserID: string, Job: string}}
   * @description Set a job. GuildID is not needed for global use.
   * @example SetJob({ GuildID: "881789379553656872", UserID: "753974636508741673", Job: "gamer"})
   */
  SetJob({ UserID, Job } = { Job: null, UserID: null }) {
    let _a;
    return __awaiter(this, void 0, void 0, function* () {
      if (!UserID) throw new SyntaxError('A user ID must be specified.');
      if (!Job) throw new SyntaxError('An amount must be specified.');
      const user = yield global_users_1.default.findOne({
        userID: UserID,
      });
      if (!user) {
        const newUser = new global_users_1.default({
          userID: UserID,
        });
        return newUser.save();
      }
      const job = jobs_js_1.default.find(
        (job) => job.Name.toLocaleLowerCase() === Job.toLocaleLowerCase(),
      );
      const current = user.job;
      const leftJob = user.jobLeft;
      const timeout = 21600000;

      if (current) {
        return {
          status: 'error',
          value: 'Already Working',
          description:
            'You are already working. Remove your job or use Reassign Command',
        };
      } if (!job) {
        const Jobss = [];
        jobs_js_1.default.map((x) => {
          Jobss.push({
            Name: x.Name,
            Salary: `${this.currency} ${x.Salary}`,
          });
        });
        return {
          status: 'error2',
          value: Jobss,
          description: 'Choose a correct job from the list below',
        };
      } if (
        leftJob !== null
        && timeout - (Date.now() - leftJob?.getTime()) > 0
      ) {
        const time = timeout - (Date.now() - leftJob.getTime());
        return {
          status: 'error',
          value: 'Just Left Job',
          description: `You just left your old job. Wait for ${_msToTime(
            time,
          )} to apply again`,
        };
      } if (job.Name) {
        user.job = job.Name;
        user.salary = job.Salary;
        yield user.save();
        return {
          status: 'success',
          value: 'Job Assigning Successful',
          description: `Successfully gave you the job: ${job.Name} with a salary of ${this.currency} ${job.Salary}`,
        };
      }
    });
  }

  /**
   * Work
   * @param {{ GuildID?: string,  UserID: string}}
   * @description Work for an user. GuildID is not needed for global use.
   * @example Work({ GuildID: "881789379553656872", UserID: "753974636508741673" })
   */
  Work({ UserID } = { UserID: null }) {
    let _a;
    return __awaiter(this, void 0, void 0, function* () {
      if (!UserID) throw new TypeError('A member ID must be specified');
      const UserData = yield global_users_1.default.findOne({
        userID: UserID,
      });

      if (!UserData || !UserData.job) {
        const AddUser = new global_users_1.default({
          userID: UserID,
        });
        yield AddUser.save();
        return {
          status: 'error',
          value: 'No Job',
          description: 'Get a job before working',
        };
      }

      if (!UserData.job) {
        return {
          status: 'error',
          value: 'No Job',
          description: 'Get a job before working',
        };
      }

      const jobs = jobs_js_1.default.find(
        (job) => job.Name.toLocaleLowerCase() === UserData.job.toLocaleLowerCase(),
      );

      const AMT = UserData.salary;
      const timeout = jobs.timeout || 7200000;
      const work = UserData.lastUsedWork;
      if (work !== null && timeout - (Date.now() - work.getTime()) > 0) {
        const time = timeout - (Date.now() - work.getTime());
        return {
          status: 'error',
          value: 'Already Worked',
          description: `You have already worked. Wait for ${_msToTime(
            time,
          )} to work again`,
        };
      }
      UserData.wallet += Number(AMT);
      UserData.lastUsedWork = new Date();
      yield UserData.save();
      return {
        status: 'success',
        value: 'Successfully Finished Your Work',
        description: `You got ${this.currency} ${AMT} for Working as: ${
          UserData.job
        }. You can Work again in ${_msToTime(work)}`,
      };
    });
  }
}
/**
 * @private
 */
function _msToTime(duration) {
  const portions = [];
  const msInDay = 1000 * 60 * 60 * 24;
  const days = Math.trunc(duration / msInDay);

  if (days > 0) {
    portions.push(days + (days === 1 ? ' day' : ' days'));
    duration -= days * msInDay;
  }
  const msInHour = 1000 * 60 * 60;
  const hours = Math.trunc(duration / msInHour);
  if (hours > 0) {
    portions.push(hours + (hours === 1 ? ' hour' : ' hours'));
    duration -= hours * msInHour;
  }
  const msInMinute = 1000 * 60;
  const minutes = Math.trunc(duration / msInMinute);
  if (minutes > 0) {
    portions.push(minutes + (minutes === 1 ? ' minute' : ' minutes'));
    duration -= minutes * msInMinute;
  }
  const seconds = Math.trunc(duration / 1000);
  if (seconds > 0) {
    portions.push(seconds + (seconds === 1 ? ' second' : ' seconds'));
  }
  return portions.join(' ');
}
/**
 * @private
 */
const _checkItem = (item, testableItemIdOrName) => item.Name == testableItemIdOrName || item.id == testableItemIdOrName;

module.exports = SimplyEco;
