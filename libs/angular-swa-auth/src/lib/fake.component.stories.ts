import { Meta, Story } from '@storybook/angular';
import { FakeComponent } from './fake.component';

export default {
  title: 'A Show Code Workaround',
  component: FakeComponent
} as Meta;

export const AShowCodeWorkaround: Story<FakeComponent> = args => ({
  props: args
});

AShowCodeWorkaround.args = {
  whatever: ['click me']
};
