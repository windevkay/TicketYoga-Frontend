import { storiesOf } from "@storybook/react";
import * as React from "react";

import { ErrorBanner } from "./index";

import README from "./README.md";

storiesOf("ErrorBanner", module)
  .addParameters({
    readme: {
      sidebar: README,
    },
  })
  .add("without props", () => <ErrorBanner />)
  .add("with props", () => (
    <ErrorBanner
      message={"This is a message passed in as props"}
      description={"Error description passed in as props"}
    />
  ));
