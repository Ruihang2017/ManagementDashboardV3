const db = require('./connection');
const { Task, Employee, Role, Thought } = require('../models');
const taskSeeds = require('./taskSeeds.json');
const employeeSeeds = require('./employeeSeeds.json');
const roleSeeds = require('./roleSeeds.json');
const thoughtsSeeds = require('./thoughtsSeeds.json');

// const thoughtSeeds = require('./thoughtSeeds.json');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  try {
    // await cleanDB('Thought', 'thoughts');

    await cleanDB('Task', 'tasks');
    await cleanDB('Employee', 'employees');
    await cleanDB('Role', 'roles');
    await cleanDB('Thought', 'thoughts');

    await Task.create(taskSeeds);
    await Employee.create(employeeSeeds);
    await Role.create(roleSeeds);
    await Thought.create(thoughtsSeeds);

    // for (let i = 0; i < thoughtSeeds.length; i++) {
    //   const { _id, thoughtAuthor } = await Thought.create(thoughtSeeds[i]);
    //   const user = await User.findOneAndUpdate(
    //     { username: thoughtAuthor },
    //     {
    //       $addToSet: {
    //         thoughts: _id,
    //       },
    //     }
    //   );
    // }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
