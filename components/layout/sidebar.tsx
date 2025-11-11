import VisitorCounter from '@/components/widgets/visitor-counter';
import SearchWidget from '@/components/widgets/search-widget';
import TimeWidget from '@/components/widgets/time-widget';
import CloudTag from '@/components/widgets/cloud-tag';
import BlogRoll from '@/components/widgets/blog-roll';
import LatestArticles from '@/components/widgets/latest-articles';
import MapsWidget from '@/components/widgets/maps-widget';
import CalendarWidgetWrapper from '@/components/widgets/calendar-widget-wrapper';

export default function Sidebar() {
  return (
    <div className="space-y-6 sticky top-20">
      <SearchWidget />
      <VisitorCounter />
      <CalendarWidgetWrapper />
      <TimeWidget />
      <LatestArticles />
      <CloudTag />
      <MapsWidget />
      <BlogRoll />
    </div>
  );
}
