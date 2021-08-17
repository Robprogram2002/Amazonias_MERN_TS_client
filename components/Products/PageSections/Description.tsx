const Description = () => (
  <>
    <h2>Description</h2>
    {/* {data && (
          <div
            className={styles.Description}
            dangerouslySetInnerHTML={createMarkup(data.product.description)}
          />
        )} */}

    <h3>Why do we use it?</h3>
    <p>
      It is a long established fact that a reader will be distracted by the
      readable content of a page when looking at its layout. The point of using
      Lorem Ipsum is that it has a more-or-less normal distribution of letters,
      as opposed to using &apos;Content here, content here&apos;, making it look
      like readable English. Many desktop publishing packages and web page
      editors now use Lorem Ipsum as their default model text, and a search for
      &apos;lorem ipsum&apos; will uncover many web sites still in their
      infancy. Various versions have evolved over the years, sometimes by
      accident, sometimes on purpose (injected humour and the like).
    </p>

    <div style={{ height: '20px' }} />

    <h3>Where can I get some?</h3>
    <p>
      There are many variations of passages of Lorem Ipsum available, but the
      majority have suffered alteration in some form, by injected humour, or
      randomised words which don&apos;t look even slightly believable. If you
      are going to use a passage of Lorem Ipsum, you need to be sure there
      isn&apos;t anything embarrassing hidden in the middle of text. All the
      Lorem Ipsum generators on the Internet tend to repeat predefined chunks as
      necessary, making this the first true generator on the Internet. It uses a
      dictionary of over 200 Latin words, combined with a handful of model
      sentence structures, to generate Lorem Ipsum which looks reasonable. The
      generated Lorem Ipsum is therefore always free from repetition, injected
      humour, or non-characteristic words etc.
    </p>
  </>
);

export default Description;
