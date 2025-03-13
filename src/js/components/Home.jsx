import React from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";
import TaskList from "./TaskList";

//create your first component
const Home = () => {
	return (
		<div className="text-center">
			<TaskList/>
		</div>
	);
};

export default Home;