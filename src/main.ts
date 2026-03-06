import { db } from "./db/database.js";
import { usersTable } from "./db/schema.js";

db.select()
	.from(usersTable)
	.then((res) => {
		console.log(res);
	});
