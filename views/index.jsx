const React = require("react");
const Layout = require("./layout.jsx");

class Index extends React.Component {
  render() {
    return (
      <Layout title="Fruits Index Page">
        <div>
          <ul>
            {this.props.metallicas.map((metallica, i) => {
              return (
                <li>
                  The {metallica.name} is {metallica.color}
                  {/* {metallica.readyToEat
                    ? ` - It is ready to eat`
                    : ` - It is not ready to eat`} */}
                    <br />
                    <a href={`  /metallicafanpage/${metallica._id}/edit`}>Edit This Fruit</a>

                  <form
                    action={`/metallicafanpage/${metallica._id}?_method=DELETE`}
                    method="POST"
                  >
                    <input type="submit" value="DELETE" />
                  </form>
                </li>
              );
            })}
          </ul>
        </div>
      </Layout>
    );
  }
}

module.exports = Index;