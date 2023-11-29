import { FidgetSpinner, ThreeDots } from 'react-loader-spinner';

class Spinners {
  fidgetSpinner() {
    return (
      <FidgetSpinner
        visible={true}
        height="80"
        width="80"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
        ballColors={['#e5a6fb', '#e5a6fb', '#e5a6fb']}
        backgroundColor="#6d1e93"
      />
    );
  }
   threeDots() {
    return (
      <ThreeDots
        height="50"
        width="50"
        radius="9"
        color="#e5a6fb"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
    );
  }
}


export const spinners = new Spinners();
