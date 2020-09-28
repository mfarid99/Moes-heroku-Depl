const React = require("react");
const Layout = require("./layout.jsx");

class Edit extends React.Component {
    render() {
      return (
        <Layout title="Edit Page">
          {/* See the Layout takes in a prop called Title and we pass Edit Page to it  note: comments can't go first or last in  jsx return*/}
          {/* form is not complet we will do that below*/}
          <form
            action={`/metallicafanpage/${this.props.fruit._id}?_method=PUT`}
            method="POST"
          >
            {"Name: "}
            <input type="text" name="name" defaultValue={this.props.metallica.name} />
            <br />
            {"Color: "}
            <input
              type="text"
              name="color"
              defaultValue={this.props.metallica.color}
            />
            {/* <br />
            Is Ready To Eat:
            {this.props.metallica.readyToEat ? (
              <input type="checkbox" name="readyToEat" defaultChecked />
            ) : (
              <input type="checkbox" name="readyToEat" />
            )}
            <br /> */}
            <input type="submit" value="Submit Changes" />
          </form>
        </Layout>
      );
    }
  }
  module.exports = Edit;