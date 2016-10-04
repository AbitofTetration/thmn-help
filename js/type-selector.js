var React = require("react")
var Data = require("./data")

var $ = React.createElement

var TypeSelector = React.createClass({
  menu(hidden, types) {
    var items = types.map(t =>
      $("button", {
        key: t,
        value: t,
        className:
          "type-selector__button " +
          "type-selector__menu-button " +
          "type-" + t,
        onClick: () => this.choose(t)
      }, t)
    )
    var className =
      "type-selector__menu " +
      (hidden ? "type-selector__menu--hidden " : "")
    return $("div", {className},
      $("h3", {}, "pick a type"),
      items
    )
  },
  openModal() {
    this.setState({open: true})
    document.body.style.overflow = "hidden"
  },
  closeModal() {
    this.setState({open: false})
    // TODO: Focus the button
    document.body.style.overflow = ""
  },
  choose(type) {
    this.props.onChange(type)
    this.closeModal()
  },
  getInitialState() {
    return {open: false}
  },
  render() {
    var state = this.state
    var props = this.props
    var types = props.includeNone ? Data.typesOrNone : Data.types
    var button =
      $("button", {
        className:
          "type-selector__button " +
          "type-selector__main-button " +
          "type-" + props.value,
        onClick: this.openModal
      }, props.value)
    return $("div", {className: "type-selector"},
      button,
      this.menu(!state.open, types)
    )
  }
})

module.exports = TypeSelector