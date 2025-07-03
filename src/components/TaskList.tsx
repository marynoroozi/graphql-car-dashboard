export function TaskList() {
  return (
    <div>
      <h2>Instructions</h2>
      <ol style={{ lineHeight: "1.8", paddingLeft: "1rem" }}>
        <li>Fork this sandbox</li>
        <li>Check that all necessary dependencies are present</li>
      </ol>
      <h2>📝 Your Task</h2>
      <ul style={{ lineHeight: "1.8", paddingLeft: "1rem" }}>
        <li>
          ✅ Use Apollo Client to query and display a list of cars from the
          existing mock GraphQL API (GetCars query)
        </li>
        <li>
          🧠 Display a different car image you've fetched from GraphQL based on
          screen size - mobile (640px or less), tablet (640px to 1023px),
          desktop (1024px or more)
        </li>
        <li>
          🎨 Use Material UI components to display the car list in styled cards
        </li>
        <li>
          ➕ Add a form to submit a new car that is stored in a local state. As
          an extra step you can mock an API call for the car creation
        </li>
        <li>🔍 Add a sorting mechanism and a search bar to filter by model</li>
        <li>
          🧰 Move your GraphQL logic into a custom hook called{" "}
          <code>useCars()</code>
        </li>
        <li>🧪 Create unit tests for your components</li>
      </ul>
      <h2>💡 Optional Extras</h2>
      <ul style={{ lineHeight: "1.8", paddingLeft: "1rem" }}>
        <li>
          Create a second GraphQL query to fetch individual cars based on their
          make, model, year, or color
        </li>
        <li>🧠 Add a second filter for year (multi-filtering)</li>
        <li>🔃 Combine filters into a reusable useCarFilters() hook</li>
      </ul>
    </div>
  );
}
