import React from 'react';
import ReactTextareaAutocomplete from '@webscopeio/react-textarea-autocomplete';
import emoji from '@jukben/emoji-search';

// import '@webscopeio/react-textarea-autocomplete/style.css'
import '../style.css';

type ItemProps = {
  entity: {
    char: string,
    name: string,
  },
};

const Item = ({ entity: { name, char } }: ItemProps) => (
  <div>{`${name}: ${char}`}</div>
);

type LoadingProps = {
  data: Array<{ name: string, char: string }>,
};

const Loading = ({ data }: LoadingProps) => <div>Loading</div>;

class App extends React.Component {
  state = {
    optionsCaretStart: false,
    clickoutsideOption: false,
    caretPosition: 0,
    text: '',
  };

  _handleOptionsCaretStart = () => {
    this.setState(({ optionsCaretStart }) => ({
      optionsCaretStart: !optionsCaretStart,
    }));
  };

  _handleClickoutsideOption = () => {
    this.setState(({ clickoutsideOption }) => ({
      clickoutsideOption: !clickoutsideOption,
    }));
  };

  _onChangeHandle = ({ target: { value } }) => {
    this.setState({
      text: value,
    });
  };

  _onCaretPositionChangeHandle = (position: number) => {
    this.setState({
      caretPosition: position,
    });
  };

  _setCaretPosition = () => {
    this.rtaRef.setCaretPosition(1);
  };

  _getCaretPosition = () => {
    alert(this.rtaRef.getCaretPosition());
  };

  _getCarePosition = () => {};

  _outputCaretEnd = (item, trigger) => item.char;

  _outputCaretStart = item => ({ text: item.char, caretPosition: 'start' });

  render() {
    const {
      optionsCaretStart,
      caretPosition,
      clickoutsideOption,
      text,
    } = this.state;

    return (
      <div>
        <div>
          <label>
            <input
              data-test="changeCaretOption"
              type="checkbox"
              defaultChecked={optionsCaretStart}
              onChange={this._handleOptionsCaretStart}
            />
            Place caret before word
          </label>
        </div>
        <div>
          <label>
            <input
              data-test="clickoutsideOption"
              type="checkbox"
              defaultChecked={clickoutsideOption}
              onChange={this._handleClickoutsideOption}
            />
            Close when click outside
          </label>
        </div>
        <div>
          Actual caret position:{' '}
          <span data-test="actualCaretPosition">{caretPosition}</span>
        </div>
        <button data-test="setCaretPosition" onClick={this._setCaretPosition}>
          setCaretPosition(1);
        </button>
        <button data-test="getCaretPosition" onClick={this._getCaretPosition}>
          getCaretPosition();
        </button>

        <ReactTextareaAutocomplete
          className="one"
          ref={ref => {
            this.rtaRef = ref;
          }}
          loadingComponent={Loading}
          style={{
            fontSize: '18px',
            lineHeight: '20px',
            padding: 5,
          }}
          containerStyle={{
            marginTop: 20,
            width: 400,
            height: 100,
            margin: '20px auto',
          }}
          closeOnClickOutside={clickoutsideOption}
          onCaretPositionChange={this._onCaretPositionChangeHandle}
          minChar={0}
          value={text}
          onChange={this._onChangeHandle}
          trigger={{
            ':': {
              dataProvider: token =>
                emoji(token)
                  .slice(0, 10)
                  .map(({ name, char }) => ({ name, char })),
              component: Item,
              output: optionsCaretStart
                ? this._outputCaretStart
                : this._outputCaretEnd,
            },
            '@': {
              dataProvider: token =>
                new Promise(res =>
                  setTimeout(() => {
                    res([{ name: 'jakub', char: 'Jakub' }]);
                  }, 1000)
                ),
              component: Item,
              output: optionsCaretStart
                ? this._outputCaretStart
                : this._outputCaretEnd,
            },
          }}
        />
      </div>
    );
  }
}

export default App;
