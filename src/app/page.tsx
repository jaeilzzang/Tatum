import styles from "./page.module.css";
import { Flex, Button, Text, ThemePanel } from "@radix-ui/themes";

export default function Home() {
  return (
    <div className={styles.page}>
      <Flex direction="column" gap="2">
        <Text>Hello from Radix Themes :</Text>
        <Button>Let's go</Button>
        <ThemePanel />
      </Flex>
    </div>
  );
}
