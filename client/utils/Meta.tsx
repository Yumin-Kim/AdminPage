import React, { ReactNode } from 'react';
import { FC } from 'react';
import { Helmet } from 'react-helmet';
import { title, link, meta } from './assets';

interface MetaProps {
  title: string;
  link: Array<{}>;
  meta: Array<{}>;
  children: ReactNode;
}

const Meta: FC<MetaProps> = ({ title, link, meta, children }) => {
  return (
    <div>
      <Helmet title={title} link={link} meta={meta} />
      {children}
    </div>
  );
};

export default Meta;
