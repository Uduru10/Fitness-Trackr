const users = [
  {
    id: 1,
    username: "Ugo",
    password: "123",
  },
  {
    id: 2,
    username: "Wilson",
    password: "123",
  },
  {
    id: 3,
    username: "Bada",
    password: "123",
  },
];

const routines = [
  {
    id: 1,
    creator_id: 2,
    is_public: true,
    name: "Leg day",
    goal: "big legs",
  },
  {
    id: 2,
    creator_id: 1,
    is_public: true,
    name: "chest day",
    goal: "get swole",
  },
  {
    id: 3,
    creator_id: 3,
    is_public: false,
    name: "abs day",
    goal: "abs like Bruce Lee",
  },
  {
    id: 4,
    creator_id: 2,
    is_public: true,
    name: "fitness",
    goal: "run real fast",
  },
  {
    id: 5,
    creator_id: 1,
    is_public: true,
    name: "upper body",
    goal: "popeye arms",
  },
  {
    id: 6,
    creator_id: 3,
    is_public: true,
    name: "lower body",
    goal: "bigger legs",
  },

  {
    id: 7,
    creator_id: 3,
    is_public: true,
    name: "test1",
    goal: "test1",
  },
];

const activities = [
  {
    id: 1,
    name: "Core1",
    description: "This is the first activity",
  },
  {
    id: 2,
    name: "Core2",
    description: "This is the second activity",
  },
  {
    id: 3,
    name: "Core3",
    description: "This is the third activity",
  },
];

const routine_activities = [
  {
    id: 1,
    routine_id: 2,
    activity_id: 3,
    duration: 30,
    count: 20,
  },
  {
    id: 2,
    routine_id: 1,
    activity_id: 1,
    duration: 60,
    count: 15,
  },
  {
    id: 3,
    routine_id: 3,
    activity_id: 2,
    duration: 15,
    count: 60,
  },
  { id: 4, routine_id: 4, activity_id: 3, duration: 5, count: 5 },
];

module.exports = { users, routines, activities, routine_activities };
