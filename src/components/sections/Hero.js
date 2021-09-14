import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { SectionProps } from '../../utils/SectionProps';
import ButtonGroup from '../elements/ButtonGroup';
import Button from '../elements/Button';
import Login from '../elements/Login';

import { CHAINS, NETWORKS, AnchorEarn, DENOMS} from '@anchor-protocol/anchor-earn';

const propTypes = {
  ...SectionProps.types
}

const defaultProps = {
  ...SectionProps.defaults
}


const Hero = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  ...props
}) => {

  const outerClasses = classNames(
    'hero section center-content',
    topOuterDivider && 'has-top-divider',
    bottomOuterDivider && 'has-bottom-divider',
    hasBgColor && 'has-bg-color',
    invertColor && 'invert-color',
    className
  );

  const innerClasses = classNames(
    'hero-inner section-inner',
    topDivider && 'has-top-divider',
    bottomDivider && 'has-bottom-divider'
  );

  const [apy, setAPY] = useState([])

  useEffect( () => {

    async function fetchData() {
      const anchorEarn = new AnchorEarn({
        chain: CHAINS.TERRA,
        network: NETWORKS.COLUMBUS_4,
        address: 'terra1lwpczvhyuuy9hkhumkpmh35gqc8sjjtc8gul6k'

      });

      const marketInfo = await anchorEarn.market({
        currencies: [DENOMS.UST]
      });

      const f = parseFloat(marketInfo.markets[0].APY) * 100
      setAPY(f.toFixed(2).toString() +"% APY");
    }

    fetchData();
  }, []);

  return (
    <section
      {...props}
      className={outerClasses}
    >
      <div className="container-sm">
        <div className={innerClasses}>
          <div className="hero-content">
            <h1 className="mt-0 mb-16 reveal-from-bottom" data-reveal-delay="200">
              Get <span className="text-color-primary">{apy}</span> on your saving
            </h1>
            <br />
            <br />
            <div className="container-xs">
              <div className="reveal-from-bottom" data-reveal-delay="600">
                <ButtonGroup>
                  <Button tag="a" color="primary" wideMobile>
                    Coming soon
                    </Button>
                </ButtonGroup>
                <Login></Login>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

Hero.propTypes = propTypes;
Hero.defaultProps = defaultProps;

export default Hero;
