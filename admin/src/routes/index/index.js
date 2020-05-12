import React, { useEffect, useState } from 'react';
import { connect } from 'dva';
import styles from './index.css';
import { getPayUrl } from '../../services/'

function IndexPage() {
  return (
    <div className={styles.normal}>
      <h1 className={styles.title}>欢迎来到跳蚤街后台管理系统</h1>
      <div className={styles.welcome} />
      {/* s */}
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
