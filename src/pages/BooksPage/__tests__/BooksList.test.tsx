import booksMock from "@/__mocks__/books";
import { expect, test } from "@jest/globals";
import renderer from "react-test-renderer";
import BooksList from "../BooksList/BooksList";

test("BooksList check", () => {
  let component = renderer.create(
    <BooksList isError={true} isLoading={false} books={[]} />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  component = renderer.create(
    <BooksList isError={false} isLoading={true} books={[]} />
  );
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  component = renderer.create(
    <BooksList isError={false} isLoading={false} books={booksMock} />
  );
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
