// components/UnityComponent.jsx

'use client';

import { Unity } from 'react-unity-webgl';
import { useUnity } from '../../hooks/useUnity'; // Adjust the path to your hook
import styles from './styles.module.css'; // Adjust the path to your CSS module
import formatNumber from '@/utils/formatNum';

export function UnityContainer() {
  // Use your custom hook to access the Unity context
  const {
    unityProvider,
    loadingProgression,
    isLoaded,
    stats,
    setStats,
    sendMessage,
    playing,
    setPlaying,
  } = useUnity();

  // Calculate the loading percentage
  const progress = Math.round(loadingProgression * 100);

  return (
    <div className={styles.unityContainer}>
      <div className="loading-overlay">
        <div
          className={`${styles.loaderBackdrop} ${
            isLoaded ? styles.loaderBackdropInvisible : ''
          }`}
        >
          <div className={styles.loaderContainer}>
            {/* Progress Bar Element */}
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                // Inline style to dynamically set the width based on the progress prop
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Textual Progress Indicator */}
            <div className={styles.progressText}>
              Loading... {Math.round(progress)}%
            </div>
          </div>
        </div>
      </div>
      <div className={styles.unityStatsAndCanvas}>
        {stats && (
          <div className={styles.statsBar}>
            <div className={styles.stats}>
              <div className={styles.stat}>
                <div
                  className={`${styles.statSanity} ${
                    stats.fps > 40
                      ? styles.statSanityHigh
                      : stats.fps > 20
                      ? styles.statSanityMed
                      : styles.statSanityLow
                  }`}
                ></div>
                <div className={styles.statLabel}>FPS</div>
                <div className={styles.statValue} id="fpsValue">
                  {stats?.fps || '--'}
                </div>
              </div>
              <div className={styles.stat}>
                <div
                  className={`${styles.statSanity} ${styles.statSanityNeutral}`}
                ></div>
                <div className={styles.statLabel}>Time</div>
                <div className={styles.statValue} id="time">
                  {formatNumber(stats?.Count / 1000)}Y
                </div>
              </div>
              <div className={styles.stat}>
                <div
                  className={`${styles.statSanity} ${styles.statSanityMed}`}
                ></div>
                <div className={styles.statLabel}>Population</div>
                <div className={styles.statValue} id="populationValue">
                  {formatNumber(stats?.PeopleCount)}
                </div>
              </div>
              <div className={styles.stat}>
                {/* {"PeopleCount":13369,"Food":9059261,"Electricity":8294861,"Petrol":-1116773,"Coal":41719,"polution":13290,"Money":196844826920} */}
                <div
                  className={`${styles.statSanity} ${
                    stats.Electricity - stats.PeopleCount > 200000
                      ? styles.statSanityHigh
                      : stats.Electricity - stats.PeopleCount > 0
                      ? styles.statSanityMed
                      : styles.statSanityLow
                  }`}
                ></div>
                <div className={styles.statLabel}>Electricity</div>
                <div className={styles.statValue} id="electricity">
                  {formatNumber(stats?.Electricity)}
                </div>
              </div>
              <div className={styles.stat}>
                {/* {"PeopleCount":13369,"Food":9059261,"Electricity":8294861,"Petrol":-1116773,"Coal":41719,"polution":13290,"Money":196844826920} */}
                <div
                  className={`${styles.statSanity} ${
                    stats.Coal - stats.PeopleCount > 200000
                      ? styles.statSanityHigh
                      : stats.Coal - stats.PeopleCount > 0
                      ? styles.statSanityMed
                      : styles.statSanityLow
                  }`}
                ></div>
                <div className={styles.statLabel}>Coal</div>
                <div className={styles.statValue} id="coal">
                  {formatNumber(stats?.Coal)}
                </div>
              </div>
              <div className={styles.stat}>
                {/* {"PeopleCount":13369,"Food":9059261,"Electricity":8294861,"Petrol":-1116773,"Coal":41719,"polution":13290,"Money":196844826920} */}
                <div
                  className={`${styles.statSanity} ${
                    stats.polution > 15000
                      ? styles.statSanityLow
                      : stats.Food - stats.PeopleCount > 10000
                      ? styles.statSanityMed
                      : styles.statSanityHigh
                  }`}
                ></div>
                <div className={styles.statLabel}>Pollution</div>
                <div className={styles.statValue} id="Pollution">
                  {formatNumber(stats?.polution)}
                </div>
              </div>
              <div className={styles.stat}>
                {/* {"PeopleCount":13369,"Food":9059261,"Electricity":8294861,"Petrol":-1116773,"Coal":41719,"polution":13290,"Money":196844826920} */}
                <div
                  className={`${styles.statSanity} ${
                    stats.Food - stats.PeopleCount > 200000
                      ? styles.statSanityHigh
                      : stats.Food - stats.PeopleCount > 0
                      ? styles.statSanityMed
                      : styles.statSanityLow
                  }`}
                ></div>
                <div className={styles.statLabel}>Food</div>
                <div className={styles.statValue} id="Food">
                  {formatNumber(stats?.Food)}
                </div>
              </div>
              <div className={styles.stat}>
                {/* {"PeopleCount":13369,"Food":9059261,"Electricity":8294861,"Petrol":-1116773,"Coal":41719,"polution":13290,"Money":196844826920} */}
                <div
                  className={`${styles.statSanity} ${
                    stats.Money - stats.PeopleCount > 2000000
                      ? styles.statSanityHigh
                      : stats.Money - stats.PeopleCount > 0
                      ? styles.statSanityMed
                      : styles.statSanityLow
                  }`}
                ></div>
                <div className={styles.statLabel}>Money</div>
                <div className={styles.statValue} id="Money">
                  {formatNumber(stats?.Money)}
                </div>
              </div>
            </div>
            <div className={styles.timeControl}>
              <button className={styles.timeButton} id="timeRewind">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  version="1.2"
                  baseProfile="tiny"
                  viewBox="0 0 24 24"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10.2 6.4c-.488 0-.931.197-1.253.512-2.381 2.315-5.947 5.789-5.947 5.789l5.944 5.789c.326.315.768.51 1.256.51.994 0 1.8-.805 1.8-1.799v-9c0-.994-.806-1.801-1.8-1.801zM19.2 6.4c-.488 0-.931.197-1.253.512-2.381 2.315-5.947 5.789-5.947 5.789l5.944 5.789c.326.315.768.51 1.256.51.994 0 1.8-.805 1.8-1.799v-9c0-.994-.806-1.801-1.8-1.801z"></path>
                </svg>
              </button>
              <button
                className={styles.timeButton}
                id="timePlay"
                onClick={() => {
                  setPlaying((prev) => {
                    const form = document.querySelector('#initial-stats-form');
                    if (form) {
                      const formData = new FormData(form);
                      const data = Object.fromEntries(formData.entries());
                      console.log(data, playing);
                      /**
                       * Represents the starting configuration data for the game simulation.
                       * All numeric types are represented by JavaScript's 'number'.
                       */
                      if (!data.Coal) return;
                      const StartData = {
                        // Values adjusted for long-term stability and realism.

                        /** The initial amount of money in the simulation. */
                        InicialMoney: 200000000000,

                        /** Initial pollution level. */
                        InitialPolution: 500,

                        /** Initial number of people. */
                        InitialPopulation: parseInt(data.PeopleCount),

                        /** Cars per person (between 0 and 1). Each car consumes 1 unit of Petrol per day. */
                        CarPerPeople: parseInt(data.CarPerPeople),

                        /** Birth rate (between 0 and 1). */
                        BirthRate: parseInt(data.BirthRate) / 10000,

                        /** Natural death rate (between 0 and 1). */
                        NaturalDeathRate: parseInt(data.DeathRate) / 10000,

                        /** Food production of a single farm. (1 person eats 1 food per day). */
                        FarmFoodProduction: 1000,

                        /** * Tree pollution reduction factor (between 1 and infinity).
                         * Pollution is reduced by: pollution / (TreepolutionReductionFactor ^ n) where n is number of trees.
                         */
                        TreepolutionReductionFactor: 1.001,

                        /** Pollution added per car (pollution += PolutionPerCar * n, where n is number of cars). */
                        PolutionPerCar: 1,

                        /** Pollution level at which pollution-related deaths begin. */
                        PolutionDeathThreshold: 20000,

                        /** Death count formula: factor * (pollution - threshold). */
                        PolutionDeathFactor: 0.0005,

                        /** Electricity production of a single solar panel per day. (1 person eats 1 electricity per day). */
                        ElectricityBySolarPanel: 50,

                        /** Electricity production of a single windmill per day. */
                        ElectricityByWindmill: 100,

                        /** Initial coal reserve. */
                        InitialCoal: parseInt(data.Coal),

                        /** Initial petrol reserve. */
                        InitialPetrol: parseInt(data.Petrol),

                        /** Pollution generated by the thermal power plant. */
                        ThermalPowerPlantPolution: 200,

                        /** Moderate death rate factor for homeless people. */
                        HomelessFactor: 0.5,

                        /** Death rate for people who are starving. */
                        StarveDeathRate: 0.1,

                        /** Initial food reserve (approx. 20 days supply). */
                        InitialFood: parseInt(data.Food),

                        /** Initial electricity reserve (approx. 20 days supply). */
                        InitialElectricity: parseInt(data.Electricity),

                        /** Electricity produced by the thermal power plant per day. */
                        ThermalPowerPlantElectricityProduction: 2000,

                        /** Percentage of money treated as a liability. */
                        LiablityPercent: parseInt(data.liability) / 100,

                        /** Money gained per person per time unit. */
                        MoneyPerPerson: 100,
                      };
                      if (playing) return;
                      // Example usage:
                      // console.log(StartData.InicialMoney);
                      // console.log(StartData.BirthRate);
                      const stringed = JSON.stringify(StartData);
                      sendMessage('Canvas', 'SetInitialData', stringed);
                    }
                    return !playing;
                  });
                }}
              >
                {playing ? (
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 448 512"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M144 479H48c-26.5 0-48-21.5-48-48V79c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48v352c0 26.5-21.5 48-48 48zm304-48V79c0-26.5-21.5-48-48-48h-96c-26.5 0-48 21.5-48 48v352c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48z"></path>
                  </svg>
                ) : (
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 448 512"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"></path>
                  </svg>
                )}
              </button>
              <button className={styles.timeButton} id="timeFastForward">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  version="1.2"
                  baseProfile="tiny"
                  viewBox="0 0 24 24"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M15.053 6.912c-.324-.314-.765-.512-1.253-.512-.994 0-1.8.807-1.8 1.801v9c0 .994.806 1.799 1.8 1.799.488 0 .93-.195 1.253-.512 2.381-2.314 5.947-5.787 5.947-5.787s-3.566-3.474-5.947-5.789zM6.053 6.912c-.324-.314-.765-.512-1.253-.512-.994 0-1.8.807-1.8 1.801v9c0 .994.806 1.799 1.8 1.799.488 0 .93-.195 1.253-.512 2.381-2.314 5.947-5.787 5.947-5.787s-3.566-3.474-5.947-5.789z"></path>
                </svg>
              </button>
            </div>
          </div>
        )}

        <Unity
          unityProvider={unityProvider}
          style={{
            visibility: isLoaded ? 'visible' : 'hidden',
            width: '960px', // Set your desired width
            height: '540px', // Set your desired height
          }}
          className={styles.unityCanvas}
        />
      </div>
    </div>
  );
}
