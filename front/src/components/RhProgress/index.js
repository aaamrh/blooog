import classnames from 'classnames';

function RhProgress(props) {

  const { className, fixed, circle, width, ...args } = props;


  return <div {...args}
      className={classnames('rh-progress', className, {'fixed': fixed})}
      
    >
    <div className="rh-progress--inner" style={{
      width: width
    }}></div>
    {
      circle && <div className="rh-progress__circle"></div>
    }
  </div>
}


export default RhProgress; 