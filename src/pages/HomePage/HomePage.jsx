import css from "./HomePage.module.css";

export default function HomePage() {
  return (
    <div className={css.container}>
      <h1 className={css.title}>Welcome to the Phonebook App</h1>
    </div>
  );
}

/*
<p className={css.text}>Please register or log in to continue.</p>

const styles = {
  container: {
    minHeight: "calc(100vh - 50px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontWeight: 500,
    fontSize: 48,
    textAlign: "center",
  },
};

export default function HomePage() {
  return (
    <>
      <title>Welcome</title>
      <div style={styles.container}>
        <h1 style={styles.title}>
          Task manager welcome page{" "}
          <span role="img" aria-label="Greeting icon">
            💁‍♀️
          </span>
        </h1>
      </div>
    </>
  );
}
*/
