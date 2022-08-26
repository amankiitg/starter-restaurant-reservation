import React from "react";
import ReservationView from "./ReservationView";

function ReservationList({ recipes, deleteRecipe }) {
  
  // TODO: Display the list of recipes using the structure of table that is provided.
  // TODO: Create at least one additional component that is used by this component.
  // TODO: Each recipe row must have a delete button - <button name="delete">Delete</button> - that deletes the post when clicked

  return (
    <div className="recipe-list">
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Mobile Number</th>
            <th>Reservation Date</th>
            <th>Reservation Time</th>
            <th>People</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        {recipes.map((recipe, index) => (
          <ReservationView
            deleteRecipe={() => deleteRecipe(index)}
            key={index}
            recipe={recipe}
          />
        ))}
        </tbody>
      </table>
    </div>
  );
}

export default ReservationList;