import { Block } from "@/pageComponents/home/Block";
import styles from "./HomePage.module.css";

export function HomePage() {
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.header}>Home</div>
        <div className={styles.blocksContainer}>
          <Block href="https://docs.replay.io/quickstart" title="Quickstart">
            Record your first replay with{" "}
            <code className={styles.code}>
              npx replayio record
            </code>
          </Block>
          <Block href="/team/new/standard" title="Add a new team">
            Set up a new team to store your replays in one place
          </Block>
          <Block href="/team/new/tests" title="Create Test Suite">
            Use Replay to record Playwright or Cypress e2e tests
          </Block>
          <Block
            href="https://www.youtube.com/playlist?list=PLOHkr6ZaQDlH5M0PZzjVG9ohyqw7avwPa"
            title="Replay Course"
          >
            Learn the steps to get rolling through our class on YouTube
          </Block>
          <Block href="https://www.replay.io/contact" title="Support">
            Contact us on Discord or send us a note
          </Block>
        </div>
      </div>
    </div>
  );
}