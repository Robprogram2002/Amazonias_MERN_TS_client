import { Rate, Progress, Avatar } from 'antd';
import styles from './Reviews.module.scss';

const Reviews = () => (
  <>
    <h2>Customer reviews</h2>
    <div className={styles.Container}>
      <div className={styles.Ratings}>
        <div className={styles.Average}>
          <Rate disabled allowHalf value={4.2} className={styles.Stars} />
          <span className={styles.RateValue}>4.2 out of 5</span>
        </div>
        <span className={styles.TotalCount}>34,174 global ratings</span>
        <div className={styles.RateTable}>
          <div className={styles.Row}>
            <span> 5 star</span>
            <Progress
              percent={91}
              strokeWidth={22}
              strokeColor="orange"
              strokeLinecap="square"
              showInfo={false}
              className={styles.Progress}
            />
            <span className={styles.Percentage}> 91%</span>
          </div>
          <div className={styles.Row}>
            <span> 4 star</span>
            <Progress
              percent={6}
              strokeWidth={22}
              strokeColor="orange"
              strokeLinecap="square"
              showInfo={false}
              className={styles.Progress}
            />
            <span className={styles.Percentage}> 6%</span>
          </div>
          <div className={styles.Row}>
            <span> 3 star</span>
            <Progress
              percent={1}
              strokeWidth={22}
              strokeColor="orange"
              strokeLinecap="square"
              showInfo={false}
              className={styles.Progress}
            />
            <span className={styles.Percentage}> 1%</span>
          </div>
          <div className={styles.Row}>
            <span> 2 star</span>
            <Progress
              percent={0}
              strokeWidth={22}
              strokeColor="orange"
              strokeLinecap="square"
              showInfo={false}
              className={styles.Progress}
            />
            <span className={styles.Percentage}> 0%</span>
          </div>
          <div className={styles.Row}>
            <span> 1 star</span>
            <Progress
              percent={1}
              strokeWidth={25}
              strokeColor="orange"
              strokeLinecap="square"
              showInfo={false}
              className={styles.Progress}
            />
            <span className={styles.Percentage}> 1%</span>
          </div>
        </div>
      </div>
      <div className={styles.CommentsContainer}>
        <div style={{ width: '80%' }}>
          <h3>Reviews with images</h3>
          <div className={styles.ImagesRow}>
            <img
              src="https://res.cloudinary.com/dhpjmkudq/image/upload/v1628626100/amazonias/fachry-zella-devandra-bNSdIkCBJOs-unsplash.jpg/1628626097686.jpg"
              alt="asnd hasjkads"
            />
            <img
              src="https://res.cloudinary.com/dhpjmkudq/image/upload/v1628626100/amazonias/fachry-zella-devandra-bNSdIkCBJOs-unsplash.jpg/1628626097686.jpg"
              alt="asnd hasjkads"
            />
            <img
              src="https://res.cloudinary.com/dhpjmkudq/image/upload/v1628626100/amazonias/fachry-zella-devandra-bNSdIkCBJOs-unsplash.jpg/1628626097686.jpg"
              alt="asnd hasjkads"
            />
            <img
              src="https://res.cloudinary.com/dhpjmkudq/image/upload/v1628626100/amazonias/fachry-zella-devandra-bNSdIkCBJOs-unsplash.jpg/1628626097686.jpg"
              alt="asnd hasjkads"
            />
          </div>
          <span className={styles.TextLink}>See all customer images</span>
          <h3>Top Reviews</h3>

          <div className={styles.CommentCard}>
            <div className={styles.User}>
              <Avatar className={styles.Avatar} />
              <span> Roberto Martinez </span>
            </div>
            <div className={styles.Head}>
              <Rate disabled allowHalf value={4.2} className={styles.Stars} />
              <h4>Could not get it to run at rated speed on an MSI X570 MB</h4>
            </div>
            <span className={styles.GrayText}>
              Reviewed in the United States on December 27, 2020
            </span>
            <div className={styles.Content}>
              <p>
                It will run at 2133 MHz out of the box, but that&apos;s not what
                you&apos;re paying for. Perhaps it works fine with Intel
                chipsets, but it consistently refused to boot with the MSI X570
                Prestige motherboard. Not using the XMP profile, not by setting
                the timings manually, not after increasing the voltage to 1.35 V
                or above.
              </p>
              <p>
                The highest speed I could get it to run at is 2800 MHz. If
                you&apos;re looking for a memory for a Ryzen build, probably
                look elsewhere.
              </p>
            </div>
            <span className={styles.GrayText}>
              52 people found this helpful
            </span>
            <button className={styles.VoteButton} type="button">
              Helpful
            </button>
            <span className={styles.AbuseText}>Report abuse</span>
          </div>

          <div className={styles.CommentCard}>
            <div className={styles.User}>
              <Avatar className={styles.Avatar} />
              <span> Roberto Martinez </span>
            </div>
            <div className={styles.Head}>
              <Rate disabled allowHalf value={4.2} className={styles.Stars} />
              <h4>Could not get it to run at rated speed on an MSI X570 MB</h4>
            </div>
            <span className={styles.GrayText}>
              Reviewed in the United States on December 27, 2020
            </span>
            <div className={styles.Content}>
              <p>
                It will run at 2133 MHz out of the box, but that&apos;s not what
                you&apos;re paying for. Perhaps it works fine with Intel
                chipsets, but it consistently refused to boot with the MSI X570
                Prestige motherboard. Not using the XMP profile, not by setting
                the timings manually, not after increasing the voltage to 1.35 V
                or above.
              </p>
              <p>
                The highest speed I could get it to run at is 2800 MHz. If
                you&apos;re looking for a memory for a Ryzen build, probably
                look elsewhere.
              </p>
            </div>
            <span className={styles.GrayText}>
              52 people found this helpful
            </span>
            <button className={styles.VoteButton} type="button">
              Helpful
            </button>
            <span className={styles.AbuseText}>Report abuse</span>
          </div>

          <div className={styles.CommentCard}>
            <div className={styles.User}>
              <Avatar className={styles.Avatar} />
              <span> Roberto Martinez </span>
            </div>
            <div className={styles.Head}>
              <Rate disabled allowHalf value={4.2} className={styles.Stars} />
              <h4>Could not get it to run at rated speed on an MSI X570 MB</h4>
            </div>
            <span className={styles.GrayText}>
              Reviewed in the United States on December 27, 2020
            </span>
            <div className={styles.Content}>
              <p>
                It will run at 2133 MHz out of the box, but that&apos;s not what
                you&apos;re paying for. Perhaps it works fine with Intel
                chipsets, but it consistently refused to boot with the MSI X570
                Prestige motherboard. Not using the XMP profile, not by setting
                the timings manually, not after increasing the voltage to 1.35 V
                or above.
              </p>
              <p>
                The highest speed I could get it to run at is 2800 MHz. If
                you&apos;re looking for a memory for a Ryzen build, probably
                look elsewhere.
              </p>
            </div>
            <span className={styles.GrayText}>
              52 people found this helpful
            </span>
            <button className={styles.VoteButton} type="button">
              Helpful
            </button>
            <span className={styles.AbuseText}>Report abuse</span>
          </div>
        </div>
      </div>
      <div style={{ height: '40px' }} />
    </div>
  </>
);

export default Reviews;
