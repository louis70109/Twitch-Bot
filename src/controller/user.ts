import { UserModel } from '../model/user';

async function userCreate(userObj: any): Promise<void> {
  const user = new UserModel(userObj);
  await user.save(err => {
    if (err) throw Error(err);
    console.log('success');
  });
}

export { userCreate };
