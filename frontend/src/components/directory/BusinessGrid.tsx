import BusinessCard from "./BusinessCard";

const businesses = [
  { id: 1, name: "Joe's Cafe", category: "Cafe", location: "New York" },
  { id: 2, name: "Tech Solutions", category: "IT Services", location: "San Francisco" },
  { id: 3, name: "Green Grocers", category: "Grocery Store", location: "Chicago" },
];
export default function BusinessGrid() {
  return (
    <div>
      {businesses.map((b) => (
        <BusinessCard
          key={b.id}
          name={b.name}
          category={b.category}
          location={b.location}
        />
      ))}
    </div>
  );
}
