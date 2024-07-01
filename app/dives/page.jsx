import styles from "./page.module.css";
import DiveGrid from "@/components/DiveGrid";

export default function DivesPage() {
  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h2>My Dive Log</h2>
        <p>Here you can find all the dives you have logged.</p>
      </header>

      {/* TODO Add a section with collective quick overview data */}
      {/* <article>
        <div>
          <p>Total dives: 6</p>
          <p>Total time: 345min</p>
          <p>Average depth: 16m</p>
        </div>
      </article> */}

      <DiveGrid dives={dummyData} />
    </main>
  );
}

const dummyData = [
  {
    title: "Dive 1",
    location: "Great Barrier Reef",
    date: "2022-07-14",
    depth: "10m",
    time: "45min",
    image: "/dummy/img-1.jpg",
    description:
      "First dive at the Great Barrier Reef, amazing coral formations.",
    slug: "dive-1-great-barrier-reef",
  },
  {
    title: "Dive 2",
    location: "Belize Barrier Reef",
    date: "2022-08-10",
    depth: "12m",
    time: "50min",
    image: "/dummy/img-2.jpg",
    description: "Swam with a school of colorful fish in Belize.",
    slug: "dive-2-belize-barrier-reef",
  },
  {
    title: "Dive 3",
    location: "Galápagos Islands",
    date: "2022-09-05",
    depth: "15m",
    time: "55min",
    image: "/dummy/img-3.jpg",
    description:
      "Encountered some sea lions and turtles. Unforgettable experience.",
    slug: "dive-3-galapagos-islands",
  },
  {
    title: "Dive 4",
    location: "Red Sea",
    date: "2022-10-21",
    depth: "18m",
    time: "60min",
    image: "/dummy/img-4.jpg",
    description: "Explored an underwater wreck. Saw a variety of marine life.",
    slug: "dive-4-red-sea",
  },
  {
    title: "Dive 5",
    location: "Maldives",
    date: "2022-11-15",
    depth: "20m",
    time: "65min",
    image: "/dummy/img-5.jpg",
    description: "Night dive with bioluminescent organisms. Magical.",
    slug: "dive-5-maldives",
  },
  {
    title: "Dive 6",
    location: "Great Blue Hole",
    date: "2022-12-10",
    depth: "22m",
    time: "70min",
    image: "/dummy/img-6.jpg",
    description: "Dove into the mysterious depths of the Great Blue Hole.",
    slug: "dive-6-great-blue-hole",
  },
];
