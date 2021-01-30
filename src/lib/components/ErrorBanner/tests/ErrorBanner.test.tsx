import { render } from "@testing-library/react";

import { ErrorBanner } from "../index";

describe("ErrorBanner", () => {
  it("should render default message and description if there are no props", () => {
    const { queryByText } = render(<ErrorBanner />);

    expect(
      queryByText(
        "Looks like something went wrong. Please check your connection and/or try again later."
      )
    ).not.toBeNull();

    expect(queryByText("Uh oh! Something went wrong 😔")).not.toBeNull();
  });

  it("should render message prop if passed in", () => {
    const messageProp = "An Error occured!";
    const { queryByText } = render(<ErrorBanner message={messageProp} />);

    expect(queryByText(messageProp)).not.toBeNull();
  });
});
