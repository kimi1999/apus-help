import Main from './components/Main.vue';
import Answer from './components/Answer.vue';
import Feedback from './components/Feedback.vue';
import Success from './components/Success.vue';
import Reply from './components/Reply.vue';
import AllQuestion from './components/AllQusetion.vue';
import Question from './components/Question.vue';

const registerRoute = [
  {
    path: '/',
    component: Main,
  },
  {
    path: '/answer',
    component: Answer,
  },
  {
    path: '/feedback',
    component: Feedback,
  },
  {
    path: '/success',
    component: Success,
  },
  {
    path: '/reply',
    component: Reply,
  },
  {
    path: '/allQuestion',
    component: AllQuestion,
  },
  {
    path: '/question',
    component: Question,
  }
  ];
export default registerRoute;
