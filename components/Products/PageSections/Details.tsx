// import draftToHtml from 'draftjs-to-html';
import DOMPurify from 'dompurify';
import styles from './Details.module.scss';

const Details = ({ details }: { details: string }) => {
  // const createMarkup = (rawContent: any) => {
  //   const html = draftToHtml(rawContent);
  //   const result = { __html: DOMPurify.sanitize(html) };

  //   return result;
  // };

  const createMarkup = (rawContent: any) => ({
    __html: DOMPurify.sanitize(rawContent),
  });
  return (
    <>
      <h2>Product Information</h2>
      <div className={styles.DetailsContainer}>
        <div
          className={styles.Details}
          dangerouslySetInnerHTML={createMarkup(details)}
        />
        <div className={styles.Aditional}>
          <h3>Aditional Information</h3>
          <table>
            <tbody>
              <tr>
                <td>Customer Reviews</td>
                <td>35,030 ratings</td>
              </tr>
              <tr>
                <td>Best Sellers Rank</td>
                <td>#3 in Computer CPU Processors</td>
              </tr>
            </tbody>
          </table>
          <div style={{ height: '20px' }} />
          <h3>Warranty & Support</h3>
          <p>
            Amazon.com Return Policy:You may return any new computer purchased
            from Amazon.com that is &quot;dead on arrival,&quot; arrives in
            damaged condition, or is still in unopened boxes, for a full refund
            within 30 days of purchase. Amazon.com reserves the right to test
            &quot;dead on arrival&quot; returns and impose a customer fee equal
            to 15 percent of the product sales price if the customer
            misrepresents the condition of the product. Any returned computer
            that is damaged through customer misuse, is missing parts, or is in
            unsellable condition due to customer tampering will result in the
            customer being charged a higher restocking fee based on the
            condition of the product. Amazon.com will not accept returns of any
            desktop or notebook computer more than 30 days after you receive the
            shipment. New, used, and refurbished products purchased from
            Marketplace vendors are subject to the returns policy of the
            individual vendor.
          </p>
          <span>
            <strong> Product Warranty: </strong> For warranty information about
            this product, please click here
          </span>
          <div style={{ height: '20px' }} />
          <h3>FeedBack</h3>
          <p>Would you like to tell us about a lower price?</p>
        </div>
      </div>
    </>
  );
};

export default Details;
